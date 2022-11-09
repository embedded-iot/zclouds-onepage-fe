import React from 'react';
import { Col, Row } from 'antd';

const GridView = ({
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
          <Col span={colSpan} key={index} onClick={ () => onSelectGridItem(item)} >
            {
              gridItemTemplate({ item, index })
            }
          </Col>
        ))
      }
    </Row>
  )
}


export default GridView;
