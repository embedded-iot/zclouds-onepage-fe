import React from 'react';
import { Col, Row } from 'antd';

const Grid = ({
                dataSource = [],
                gridItemTemplate = () => {},
                onSelectGridItem = () => {},
                isAllowSelection = false,
                gutter = [20, 20],
                colSpan = 6
}) => {
  return (
    <Row gutter={gutter}>
      {
        dataSource.map((item, index) => (
          <Col span={colSpan} key={index} onClick={ () => onSelectGridItem} >
            {
              gridItemTemplate({ item, index })
            }
          </Col>
        ))
      }
    </Row>
  )
}


export default Grid;
