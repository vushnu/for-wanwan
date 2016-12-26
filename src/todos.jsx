import React from 'react'
import ReactDOM from 'react-dom'
import TodosItem from './todosItem.jsx'
import classNames from 'classnames'

class Todos extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      indexEditField: false,
      allElem: true,
      activeElem: false,
      complitedElem: false,
      currentActive: 0,
      clear: false,
    };
    this.newElem = this.newElem.bind(this);
    this.delElem = this.delElem.bind(this);
    this.edit = this.edit.bind(this);
    this.editingEnd = this.editingEnd.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.allElem = this.allElem.bind(this);
    this.activeElem = this.activeElem.bind(this);
    this.complitedElem = this.complitedElem.bind(this);
    this.quantityActive = this.quantityActive.bind(this);
    this.clearComplite = this.clearComplite.bind(this);
    this.id = localStorage.length ? JSON.parse(localStorage.getItem('todos')).length : 0;
  }
  
  componentDidMount(){
    if(localStorage.length){
      let todos =  JSON.parse(localStorage.getItem('todos'));
      let currentActive = 0
      todos.forEach((el)=>{
        if(!el.check) currentActive++
      })
      this.setState({
        todos: todos || [],
        currentActive: currentActive
      });
    }
  }
  
  newElem(e){
    if(e.key === 'Enter'){
      let newTodos = [
        ...this.state.todos,
        {
          id: this.id++,
          value: e.target.value,
          check: false
        }]
      this.setState({
        todos: newTodos,
        currentActive: this.state.currentActive+1
      })
      localStorage.setItem('todos', JSON.stringify(newTodos))
      e.target.value = '';
    }
  }
  
  delElem(idx, event){
    if(!event.button){
      let newTodos = this.state.todos.filter((e, i)=>{
        return i !== idx;
      })
      this.setState({
        todos: newTodos,
        currentActive: this.state.todos.length-1
      });
      localStorage.setItem('todos', JSON.stringify(newTodos))
    }
  }  
  edit(idx){
    this.setState({indexEditField: idx})
  }
  
  editingEnd(e, idx){
    if(e.key === 'Enter'){
      let newTodos = this.state.todos.map((el, i)=>{
        if(i === idx) el.value = e.target.value;
        return el;
      })
      localStorage.setItem('todos', JSON.stringify(newTodos))
      this.setState({indexEditField: false});
    }
  }
  
  onBlur(){
    this.setState({indexEditField: false});
  }
  allElem() {
    this.setState({
      allElem: true,
      activeElem: false,
      complitedElem: false
    });
  }
  activeElem() {
    this.setState({
      allElem: false,
      activeElem: true,
      complitedElem: false
    });
  }
  complitedElem() {
    this.setState({
      allElem: false,
      activeElem: false,
      complitedElem: true
    });
  }
  quantityActive(e, i){
    let newTodos = this.state.todos.map((el, idx)=>{
      if(idx === i) el.check = !el.check
      return el
    })
    this.setState({todos: newTodos});
    localStorage.setItem('todos', JSON.stringify(newTodos))
    if(e.target.checked){
      this.setState({currentActive: this.state.currentActive-1})
    }
    else{
      this.setState({currentActive: this.state.currentActive+1})
    }
  }
  clearComplite() {
    let newTodos = this.state.todos.filter((el)=>{
      if(!el.check) return el
    })
    this.setState({todos: newTodos});
    localStorage.setItem('todos', JSON.stringify(newTodos))
  }
  render(){
    let selectAll = classNames({
      "selectOption": this.state.allElem
    })
    let selectActive = classNames({
      "selectOption": this.state.activeElem
    })
    let selectComplite = classNames({
      "selectOption": this.state.complitedElem
    })
    return (
      <div>
        <input className="entryField" onKeyPress={this.newElem} type="text" placeholder="What needs to be done?"/>
        <ul ref={(ul)=> {this.ul = ul}} >
          {this.state.todos.map((el, idx)=>
            <TodosItem
            key={el.id}
            idx={idx}
            check={el.check}
            el={el.value}
            delElem={this.delElem}
            edit={this.edit}
            editingEnd={this.editingEnd}
            onBlur={this.onBlur}
            indexEditField={this.state.indexEditField}
            allElem={this.state.allElem}
            clear={this.state.clear}
            activeElem={this.state.activeElem}
            complitedElem={this.state.complitedElem}
            quantityActive={this.quantityActive}
            />
          )}
        </ul>
        <div className="options">
          <div className="currentActive">
            <p>{this.state.currentActive} item left</p>
          </div>
          <div className="orderElem">
            <p className={selectAll} onClick={this.allElem}>All</p>
            <p className={selectActive} onClick={this.activeElem}>Active</p>
            <p className={selectComplite} onClick={this.complitedElem}>Complited</p>
          </div>
          <div className="clear">
            <p onClick={this.clearComplite}>Clear complite</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Todos;