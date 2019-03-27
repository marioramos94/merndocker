import React, { Component } from "react";
import axios from "axios";
export default class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      id: 0,
      productName: "",
      productPrice: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  getProducts = async () => {
    let response = await axios.get("http://34.219.10.55:3000/products");
    let arr = response;
    this.setState({ list: arr });
  };
  getInitialState = () => {
    this.getProducts();
  };

  postProduct = product => {
    let { id, productName, productPrice } = product;
    axios({
      method: "post",
      url: "http://34.219.10.55:3000/product",
      data: {
        id: id,
        productName: productName,
        productPrice: productPrice
      },
      config: { headers: { "Content-Type": "multipart/form-data" } }
    })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(response) {
        //handle error
        console.log(response);
      });
  };
  updateProduct = id => {
    axios({
      method: "update",
      url: "http://34.219.10.55:3000/product",
      data: {
        id: id
      },
      config: { headers: { "Content-Type": "multipart/form-data" } }
    })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(response) {
        //handle error
        console.log(response);
      });
  };
  deleteProduct = id => {
    axios({
      method: "update",
      url: "http://34.219.10.55:3000/product",
      data: {
        id: id
      },
      config: { headers: { "Content-Type": "multipart/form-data" } }
    })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(response) {
        //handle error
        console.log(response);
      });
  };

  handleSubmit(e) {
    e.preventDefault();
    let { id, productName, productPrice } = this.state;

    let newid = this.state.id + 1;
    this.setState(prevState => ({
      list: prevState.list.concat({
        productName: this.state.productName,
        productPrice: this.state.productPrice,
        id: newid
      }),

      productName: "",
      productPrice: ""
    }));
    this.postProduct({ id, productName, productPrice });
  }

  handleChange(e) {
    this.setState({
      productName: e.target.value
    });
  }
  handleChange2(e) {
    this.setState({
      productPrice: e.target.value
    });
  }

  removeItem(index, id) {
    const list = this.state.list;
    list.splice(index, 1);
    this.setState({ list });
    this.deleteProduct(id);
  }

  render() {
    return (
      <div>
        <h1>PRODUCT LIST</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            value={this.state.productName}
            placeholder={"Product name"}
            onChange={e => this.handleChange(e)}
          />
          <input
            value={this.state.productPrice}
            placeholder={"Product price ($)"}
            onChange={e => this.handleChange2(e)}
          />
          <button>Add</button>
          <ol>
            {this.state.list.map((item, index) => {
              return (
                <li key={index}>
                  {item.productName}-{item.productPrice}
                  <button onClick={() => this.removeItem(index, item.id)}>
                    Delete
                  </button>
                </li>
              );
            })}
          </ol>
        </form>
      </div>
    );
  }
}
