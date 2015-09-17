let todos: Todo[] = [
  {id: Math.random().toString(), text: "Board the plane", isDone: false},
  {id: Math.random().toString(), text: "Sleep", isDone: false},
  {id: Math.random().toString(), text: "Try to finish coneference slides", isDone: false},
  {id: Math.random().toString(), text: "Eat cheese and drink wine", isDone: false},
  {id: Math.random().toString(), text: "Go around in Uber", isDone: false},
  {id: Math.random().toString(), text: "Talk with conf attendees", isDone: false},
  {id: Math.random().toString(), text: "Show Demo 1", isDone: false},
  {id: Math.random().toString(), text: "Show Demo 2", isDone: false},
  {id: Math.random().toString(), text: "Lament about the state of animation", isDone: false},
  {id: Math.random().toString(), text: "Show Secret Demo", isDone: false},
  {id: Math.random().toString(), text: "Go home", isDone: false}
];

class TodoService {
  async getTodos(): Promise<Todo[]> {
    return new Promise<Todo[]>((resolve, reject) => {
        resolve(todos);
    });
  }
}

export default new TodoService();
