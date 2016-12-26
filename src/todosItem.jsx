import React from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'

class TodosItem extends React.Component{
  constructor(props) {
    super(props);
    this._delElem = this._delElem.bind(this);
    this._edit = this._edit.bind(this);
    this._editingEnd = this._editingEnd.bind(this);
    this._onBlur = this._onBlur.bind(this);
    this.onCheck = this.onCheck.bind(this);
    this.state = {
      check: this.props.check || false
    }
  }
   _delElem(e){
     this.props.delElem(this.props.idx, e)
    }
  _edit(e){
    this.props.edit(this.props.idx);    
  }
  
  componentDidUpdate () {
    this.refs.editField.focus();
  }
  _editingEnd(e){
    this.props.editingEnd(e, this.props.idx);
  }
  _onBlur(e){
    this.props.onBlur();
    e.target.value = this.props.el;
  }
  onCheck(e){
    this.setState({check: !this.state.check});
    this.props.quantityActive(e, this.props.idx);
  }
  render(){
    let editFieldClass = classNames('editField', {
      'hidden': this.props.idx !== this.props.indexEditField
    })
    let labelClass = classNames({
      'hidden': this.props.idx === this.props.indexEditField
    })
    let liClass = classNames({
      '': this.props.activeElem,
      'check': this.state.check,
      'hidden': this.props.activeElem && this.state.check || this.props.complitedElem && !this.state.check
    })
    return(
      <li className={liClass}>
        <input onClick={this.onCheck} defaultChecked={this.props.check} type="checkbox" />
        <i></i>        
        <label className={labelClass} onDoubleClick={this._edit}> {this.props.el} </label>
        <input
         ref="editField"
         className={editFieldClass} 
         onBlur={this._onBlur} 
         onKeyPress={this._editingEnd} 
         defaultValue={this.props.el}
        />
        <a onClick={this._delElem}>✕</a>
      </li>
    )
  }
}

export default TodosItem