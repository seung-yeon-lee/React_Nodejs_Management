import React, { PureComponent } from "react";

class Customer extends PureComponent {
  render() {
    const { name, title, stack, db, id, image } = this.props;
    return (
      <div>
        <CustomerProfile img={image} id={id} name={name} />
        <CustomerInfo title={title} stack={stack} db={db} />
      </div>
    );
  }
}
class CustomerProfile extends PureComponent {
  render() {
    const { img, id, name } = this.props;
    return (
      <div>
        <img src={img} alt="profile" />
        <h2>
          {name}({id})
        </h2>
      </div>
    );
  }
}
class CustomerInfo extends PureComponent {
  render() {
    const { title, stack, db } = this.props;
    return (
      <div>
        <p>{title}</p>
        <p>{stack}</p>
        <p>{db}</p>
      </div>
    );
  }
}

export default Customer;
