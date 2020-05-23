import React from "react"
import "./_dropdown.scss"

class Dropdown extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      active: false,
      selectedIndex: null
    }
  }

  handleFocus = _ => {
    this.setState({ active: true })
  }

  handleOnBlur = _ => {
    setTimeout(() => this.setState({active: false}), 200);
  }

  handleKeyPress = e => {
    const { selectedIndex, active } = this.state;
    if(active) {
      let currentSelectedIndex = 0 ;
      if(e.keyCode === 40) {
        currentSelectedIndex = selectedIndex + 1
        this.setState({selectedIndex: currentSelectedIndex})
      }
      if(e.keyCode === 38) {
        currentSelectedIndex = selectedIndex - 1;
        this.setState({selectedIndex: currentSelectedIndex})
      }
      if(e.keyCode === 13) {
        this.props.handleSelection(this.props.result[selectedIndex]);
        this.setState({active: false})
      }
      if(e.keyCode === 27) {
        this.setState({active: false})
      }
    }
  }

  handleSelection = element => {
    this.setState({ active: false })
    this.props.handleSelection(element);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress)
  }

  render () {
    const { selectedIndex, active } = this.state;
    return (
      <div
        className="dropdown"
      >
        <div className="dropdown__input-box">
          <input
            className="dropdown__input-box__field"
            placeholder="Search"
            type="text"
            onFocus={this.handleFocus}
            onChange={(e) => this.props.handleInput(e.target.value)}
          />
        </div>
        {
          <div className={`dropdown__list`}>
           { active &&
           this.props.result.map((ele, index) => {
            return (
              <div
                key={ele.label}
                className={`dropdown__list__element ${index === selectedIndex ? "dropdown__list__element-selected": ""}`}
                autoFocus={index === selectedIndex}
                onClick={() => this.handleSelection(ele)}
                onMouseOver={() => this.setState({selectedIndex: index})}
                >
                {ele.label}
                </div>)
              })
           }
          </div>
        }
      </div>
    )
  }
}

export default Dropdown
