// import './styles/todo-item.scss';
//
// import React from 'react';
// import classNames from "classnames";
//
// interface Props extends React.Props<any> {
//   key: any;
//   style: any;
//   data: any;
// }
//
// interface State {
//
// }
//
// class TodoItemComponent extends React.Component<Props, State> {
//   static displayName = "TodoItemComponent";
//
//   constructor(props) {
//     super(props);
//
//     this.state = {
//       isDragging: false
//     }
//   }
//
// 	render() {
//     let {key, style, data} = this.props;
//
//     return (
//       <li key={key} style={style} className={data.isDone ? 'completed' : ''}>
//         <div className="view">
//           <input
//             className="toggle"
//             type="checkbox"
//             onChange={this.handleDone.bind(null, key)}
//             checked={data.isDone}
//           />
//            <label>{data.text}</label>
//           <button
//             className="destroy"
//             onClick={this.handleDestroy.bind(null, key)}
//           />
//         </div>
//       </li>
//     );
// 	}
// }
//
// export default TodoItemComponent;
