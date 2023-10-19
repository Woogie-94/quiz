## 시작 & 테스트
```
// start
yarn && yarn run dev

// vitest
yarn test
```

## 배포 사이트
[배포 링크](http://quiz-classting.s3-website-ap-northeast-1.amazonaws.com/)

## 아키텍처
![img](https://github.com/Woogie-94/quiz/assets/59603529/e4a5263d-6e30-46a5-814e-c3459f864e20)

과제의 아키텍처는 viper 패턴을 참고해 router를 제외한 패턴으로 재구성하여 적용했습니다. 아래는 각 구성에 대한 설명입니다.

### Model(Entity)
데이터의 구성을 정하고, 필요에 따라 데이터를 가공하는 작업을 합니다.

```ts
class QuizResult {
  questions: QuestionResult[];
  correctCount: number;
  incorrectCount: number;
  totalElapsedTime: string;

  constructor(data: QuestionResult[]) {
    this.questions = data;
    this.correctCount = this.calculateCorrectCount(data);
    this.incorrectCount = this.calculateIncorrectCount(data);
    this.totalElapsedTime = "";
  }

  private calculateCorrectCount(data: QuestionResult[]) { ... }
  private calculateIncorrectCount(data: QuestionResult[]) { ... }
  private formattedTime() { ... }
  setTotalElapsedTime(){ ... }
  ...
}
```

### Interactor
서버로부터 데이터를 요청하는 로직이 있는 영역입니다. Model을 사용해 데이터를 필요한 형태로 가공하고, Presenter로 데이터와 HTTP 요청 함수를 내려줍니다.

interactor는 기능 별로 구현할 수 있습니다. `ex) 주식 페이지의 news interactor, chart interactor`

```ts
// interactor
const useQuestionInteractor = () => {
  const { data, refetch } = useQuestionResultsQuery();
  const { mutate: addResult } = useAddQuestionResultMutation();
  const { mutate: resetResult } = useResetQuestionResultMutation();

  return { questionResults: data, refetch: () => refetch, addResult, resetResult };
}

// query
const fetch = async () => {
  const data = await getQuestionResults();
  return data; // use Model -> new Model(data)
};

const useQuestionResultsQuery = () => {
  return useQuery(QUERY_KEY.questionResults, fetch);
};
```

### Presenter
Interactor로부터 데이터를 가져오고, 상태(state)와 값을 다루며 사용자 입력에 대한 로직 등 View를 구성하는데 필요한 작업을 합니다.

presenter는 기능 별로 구현할 수 있습니다.

```ts
const useQuestionPresenter = () => {
  const { questionResults, refetch, addResult } = useQuestionInteractorContext();

  const { state, search } = useLocation() as Location<RouteState>;

  const [selectedAnswer, setSelectedAnswer] = useState("");

  ...

  const onAnswerClick = (answer: string) => { ... };
  const onNextQuestionClick = () => { ... };


  return {
    question,
    isLastStep,
    isNextButtonDisabled,
    incorrectAnswerIndex,
    correctAnswerIndex,
    onNextQuestionClick,
    onAnswerClick,
  };
};
```

### View
Presenter가 내려준 요소들을 사용해 렌더링하고, 사용자 입력을 Presenter로 보내는 작업을 합니다. 
View에서는 JSX와 CSS, animation 로직들이 포함될 수 있습니다. 

```tsx
// view
const AnswerList = () => {
  const { question, correctAnswerIndex, incorrectAnswerIndex, onAnswerClick } = useQuestionPresenterContext();

  return (
    <Wrapper>
      {question.answers.map((item, index) => (
        <Answer
          key={item}
          $isCorrect={correctAnswerIndex === index}
          $isIncorrect={incorrectAnswerIndex === index}
          onClick={() => onAnswerClick(item)}
        >
          {item}
        </Answer>
      ))}
    </Wrapper>
  );
};
```

### Context API
Context API를 활용해 Interactor와 Presenter Provider를 만들어 페이지의 각 기능에 대한 interactor, presenter를 한 곳에서 관리합니다.

```tsx
// interactor
const InteractorProvider = ({ children, interactor }: { children: ReactNode; interactor: Interactors }) => {
  return <QuestionInteractorContext.Provider value={interactor}>{children}</QuestionInteractorContext.Provider>;
};

// presenter
const PresenterProvider = ({ children }: Props) => {
  const questionPresenter = useQuestionPresenter();
  return <QuestionPresenterContext.Provider value={questionPresenter}>{children}</QuestionPresenterContext.Provider>;
};

// page.index.tsx
const Question = () => {
  const questionInteractor = useQuestionInteractor();

  return (
    <InteractorProvider interactor={questionInteractor}>
      <PresenterProvider>
        <Page />
      </PresenterProvider>
    </InteractorProvider>
  );
};
```

### 단점
1. 페이지의 모든 state가 최상위에서 관리되기 때문에 불필요한 렌더링이 일어날 수 있습니다. 

### 장점
1. View에 필요한 요소들은 context에서 가져올 수 있어 Props Drilling이 최소화됩니다.
2. 코드가 관심사 별로 명확하게 구분되어 있어 유지보수에 유리합니다.
3. 테스트 작성 시 mocking에 대한 작업을 최소화 할 수 있습니다. 아래는 예시입니다.
```tsx
// todo.test.tsx
const useFakeTodoInteractor = (data: Todo[]) => {
  const [todoList, setTodoList] = useState(data);

  return {
    todoList,
    addTodo: async (value: string) => { ... },
    editTodo: async (todo: Todo) => { ... },
    deleteTodo: async (id: number) => { ... },
  };
};

const Wrapper = ({ children }: { children: ReactElement }) => {
   return (
      <InteractorProvider interactors={useFakeTodoInteractor([
         { id: 1, value: "test1", checked: false },
         { id: 2, value: "test2", checked: false }
      ])}>
        <PresenterProvider>
          {children}
        </PresenterProvider>
      </InteractorProvider>
   )
}

describe("Todo", () => {
   beforeEach(() => {
      render(
        <Wrapper>
          <Todo />
        </Wrapper>,
      );
   })

   it("Todo가 렌더링 된다.", () => {
      expect(screen.getByText('test1')).toBeInTheDocument();
      expect(screen.getByText('test2')).toBeInTheDocument();
    });

   it("Todo가 추가 된다.", () => {
      ...
      fireEvent.click(button)
      expect(screen.getByText('test3')).toBeInTheDocument();
   })

   ...
})
```


## localStorage
문제 정답 기록은 localStorage를 이용했습니다. rest api 형식으로 사용하고 싶어 msw와 json-server를 고려했지만 사용자를 구분할 수 없어 여러명이 동시에 퀴즈를 진행한다면 문제가 생기기 때문에 localStorage로 정했습니다.
대신 localStorage를 api로 생각하고 query를 이용해 과제를 진행했습니다. 이 점 참고 부탁드립니다.

## Github Action
action을 통해 S3 배포와 테스트를 자동화 했습니다.
