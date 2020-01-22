import React from 'react';
import { Pagination } from 'react-bootstrap';

const CustomPagination = props => {

  const getPageNumberByLabel = (label, currPage, lastPage) => {
    if (label.indexOf('«') > -1) {
      return 1;
    } else if (label.indexOf('»') > -1) {
      return lastPage;
    } else if (label.indexOf('‹') > -1) {
      return currPage == 1 ? 1 : currPage - 1;
    } else if (label.indexOf('›') > -1) {
      return currPage == lastPage ? lastPage : currPage + 1;
    }
    return label;
  }

  const onPageChangeHandler = event => {
    const pageNumber = getPageNumberByLabel(event.target.innerText, props.currentPage, props.totalPages);
    props.onPageChange(pageNumber);
  }

  let active = props.currentPage;
  let items = [<Pagination.First key='first' />, <Pagination.Prev key='prev' />];
  for (let number = 1; number <= props.totalPages; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>,
    );
  }
  items.push([<Pagination.Next key='next' />, <Pagination.Last key='last' />]);

  return <Pagination onClick={onPageChangeHandler}>{items}</Pagination>
}

export default CustomPagination;