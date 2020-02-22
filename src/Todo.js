import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

class Todo extends Component {
constructor(props) {
    super(props)

    this.state = { 
        edit: false,
        id: null,
        mockData: [{
            id: '1',
            title: 'Buy Milk',
            done: false,
            date: new Date()
        }, 
        {
            id: '2',
            title: 'Meeting with Ali',
            done: false,
            date: new Date()
        },
        {
            id: '3',
            title: 'Tea break',
            done: false,
            date: new Date()
        },
        {
            id: '4',
            title: 'Go for a run',
            done: false,
            date: new Date()
        }]
    }
}

onSubmitHandle(event) {
    event.preventDefault();
    this.setState({
    mockData: [...this.state.mockData, {
        id: Date.now(),
        title: event.target.item.value,
        done: false,
        date: new Date()
    }]
});
event.target.item.value='';
}

onDeleteHandle(){
    let id = arguments[0];
    this.setState({
        mockData: this.state.mockData.filter(item =>{
            if (item.id !== id) {
                return item;
            }
        })
    });
}

onEditHandle(event) {
    this.setState({
      edit: true,
      id: arguments[0],
      title: arguments[1]
    });
  }

onUpdateHandle(event) {
    event.preventDefault();
    this.setState({
      mockData: this.state.mockData.map(item => {
        if (item.id === this.state.id) {
          item['title'] = event.target.updatedItem.value;
          return item;
        }

        return item;
      })
    });
    this.setState({
      edit: false
    });
  }

onCompleteHandle() {
    let id = arguments[0];

    this.setState({
      mockData: this.state.mockData.map(item => {
        if (item.id === id) {
          item['done'] = true;
          return item;
        }

        return item;
      })
    });
  }

  renderEditForm() {
    if (this.state.edit) {
      return <form onSubmit={this.onUpdateHandle.bind(this)}>
      <div><b>Update Record:</b></div>
        <input type="text" name="updatedItem" className="item" defaultValue={this.state.title} />
        <button className="update-add-item">Update</button>
      </form>
    }
  }

  render() { 
    return (
      <Table striped bordered hover>
        <tbody>
          {this.state.mockData.map(item => (

<tr key={item.id}>
          <th scope="row">{item.id}</th>
          <td className={ item.done ? 'done' : 'hidden' }><div className="ml-2 mr-2">{item.title}</div></td>
          <td><div className="ml-2 mr-2">{item.date.toDateString()}</div></td>
          <td><div className="ml-2 mr-2">SDf</div></td>
          <td><div className="ml-2 mr-2">Phone</div></td>
          <td><div className="ml-2 mr-2">Location</div></td>
          <td>            
            <div>
<Button className="mr-1 ml-1 mb-3" variant="danger" onClick={this.onDeleteHandle.bind(this, item.id)}>Delete</Button>
<Button className="mr-1 ml-1 mb-3" variant="warning" onClick={this.onEditHandle.bind(this, item.id, item.title)}>Edit</Button>
<Button className="mr-1 ml-1 mb-3" variant="success" onClick={this.onCompleteHandle.bind(this, item.id)}>Complete</Button>
            </div>
            </td>
        </tr>
          ))}
          </tbody>
                  <thead>
                  <div>
        {this.renderEditForm()}
        <b>Add a New Record:</b>
<form onSubmit={this.onSubmitHandle.bind(this)}>
<input type="text" name="item" className="item" />
<button className="btn-add-item">Add</button>
</form>
</div>  
          <tr>
            <th><div className="mr-2">ID</div></th>
            <th><div className="mr-2">Task</div></th>
            <th><div className="mr-2">Date</div></th>
            <th><div className="mr-2">Hobby</div></th>
            <th><div className="mr-2">Phone</div></th>
            <th><div className="mr-2">Location</div></th>
            <th><div className="mr-2">Actions</div></th>
          </tr>
        </thead>
      </Table>    
    );
    
  }
  
}

export default Todo;