import React from "react";
import {Col, Row, Skeleton as AntdSkeleton} from 'antd';

const Skeleton: React.FC = () => {
    return (
        <Row className='mb-10'>
            <AntdSkeleton.Input block={true} />
            <Col span={24}>
                <div className="scrollable-strip">
                </div>
            </Col>
        </Row>
    );
};

export default Skeleton;