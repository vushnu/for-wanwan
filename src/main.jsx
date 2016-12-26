import React from 'react'
import ReactDOM from 'react-dom'
import Todos from './todos.jsx'
import './style.scss'

ReactDOM.render((
    <div className="conteiner">
     <h1>Todos</h1>
     <Todos/>
    </div>),
    document.getElementById('root'))