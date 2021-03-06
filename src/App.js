import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Loading from './components/Loading';

class App extends Component {
  state = {
    todos: []
  };

  // The result variable below gives us a promise.
  // But because we want the actual result of the promise,
  // we have to make the GET request an asynchronous request.
  // This just means that our application will continue to run,
  // and once it gets the information (data), it'll return the result variable.
  // The new Promise code is for showing the spinner for at least a second
  // before rendering the list of todos
  async componentDidMount() {
    let result = await axios.get('https://jsonplaceholder.typicode.com/todos');
    await new Promise(x => setTimeout(x, 1000));
    this.setState({ todos: result.data });
  };

  // If you run the code below, you'll see that line 26 gets called before line 24
  // Using async / await is a lot cleaner,
  // but use with caution because it doesn't support some of the older browsers
  // componentDidMount() {
  //   axios
  //     .get('https://jsonplaceholder.typicode.com/todos')
  //     .then(
  //       () => console.log('after result')
  //     );
  // };

  render() {
    return (
      <div className='container'>
        {this.state.todos.length > 0 

          ? <div>
              <ul className="list-group">
                {this.state.todos.map(todo =>
                  <li 
                    key={todo.id} 
                    className="list-group-item d-flex justify-content-between align-items-center" >

                    {todo.title}

                    <span className="">
                      <input type='checkbox' checked={todo.completed} />
                    </span>

                  </li>
                )}
              </ul>
            </div> 

          : <Loading /> }
      </div>
    );    
  }
}

export default App;
