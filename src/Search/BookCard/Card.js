import React from 'react';
import './_card.scss';

class Card extends React.PureComponent {

  render () {
    const { summary, title, author } = this.props;
    return (
      <div className="card">
        <div className="card__title">{title}</div>
        <div className="card__summary">{summary}</div>
        <div className="card__author">{author}</div>
      </div>
    )
  }
}

export default Card;
