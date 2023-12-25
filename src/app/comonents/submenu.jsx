import React, { Component } from "react";

/**
 * Component that alerts if you click outside of it
 */
export default class OutsideAlerter extends Component {
  constructor(props) {
    super(props);
    this.setSub = props.setSub;
    this.sub = props.sub;
    this.setModal = props?.setModal;
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  /**
   * Set the wrapper ref
   */
  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  /**
   * Alert if clicked on outside of element
   */
  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
       if(!this.setModal&&!this.setSub){ console.log(this.wrapperRef.style.display = "none")}
        if(this.setSub){
            this.setSub(!this.sub)
        }
        if(this.setModal){
          this.setModal(false)
        }
        
    }
  }

  render() {
    return <div className="modalcontainer" ref={this.setWrapperRef}>{this.props.children}</div>;
  }
}
