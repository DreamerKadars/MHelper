import { Button, Grid, Message, Modal } from '@arco-design/web-react';
import { useEffect, useState } from 'react';
import { HeroTemplate } from '../../type'; 

import { IconEdit, IconDelete } from '@arco-design/web-react/icon';
import { HandlerAxiosErrPrefix } from '../../../utils/api/help';
import { SkipToUrl } from '../../../utils/helper';
import { PathHeroTemplateCreate } from '../../../const';
const { Row, Col } = Grid;


export default function HeroTemplateManage() {
    let defaultHeroTemplateList: HeroTemplate[] = []
    let defaultHeroTemplateDelete: HeroTemplate = {}
    const [HeroTemplateList, setHeroTemplateList] = useState(defaultHeroTemplateList)
    const [ReadFlag, setReadFlag] = useState(false)
    const [HeroTemplateDelete, setHeroTemplateDelete] = useState(defaultHeroTemplateDelete)
    const [FlagDelete, setFlagDelete] = useState(false)

    // const [{ data, loading, error }, execute, refetch] = ListHeroTemplat()
    
    return (
        <div>
            <Button type={"primary"} onClick={() => {
                SkipToUrl(PathHeroTemplateCreate)
             }}>创建角色模板</Button>
            {/* <Button type='primary' onClick={() => { SkipToUrl(PathHeroTemplateCreate) }} style={{ marginBottom: 24 }} >创建卡牌 </Button>
            <Modal visible={FlagDelete} onCancel={() => { setFlagDelete(false) }} onOk={() => {
                http.delete(HeroTemplateDeletePath + "?ID=" + HeroTemplateDelete.ID).then(function (response) {
                    Message.success("删除成功")
                    setFlagDelete(false)
                    setReadFlag(false)
                })
                    .catch(function (error) {
                        HandlerAxiosErr(error)
                    })
            }}>请确认是否删除【{HeroTemplateDelete.Name}】</Modal>
            <Row className='grid-gutter-demo' gutter={[24, 12]}>
                {HeroTemplateList?.map((card: HeroTemplate, index) => {
                    return (
                        <Col span={4} key={index}>
                            <ArcoHeroTemplate
                                title={card.Name}
                                style={{ width: "%15" }}
                                extra={HeroTemplateSerialNumberLabelMap.get(card.HeroTemplateSerialNumber)?.label + "-" + Array((4 - card.HeroTemplateID.toString().length) > 0 ? (4 - card.HeroTemplateID.toString().length) : 0).join("0") + card.HeroTemplateID + "-" + HeroTemplateLevelLabelMap.get(card.Level)}
                                actions={[
                                    <span className='icon-hover'>
                                        <IconEdit onClick={() => {
                                            SkipToUrl(PathHeroTemplateUpdate + "/" + card.ID)
                                        }} />
                                    </span>,
                                    <span className='icon-hover'>
                                        <IconDelete onClick={() => {
                                            setFlagDelete(true)
                                            setHeroTemplateDelete(card)
                                        }} />
                                    </span>,
                                ]}
                            >
                                {card.Content}
                            </ArcoHeroTemplate>
                        </Col>
                    );
                })}
            </Row> */}
        </div>
    );
}