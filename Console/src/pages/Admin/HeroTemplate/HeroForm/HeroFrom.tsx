import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    Form,
    Input,
    Select,
    Button,
    Message,
    InputNumber,
    InputTag,
} from '@arco-design/web-react';
import { GetHeroDetail, HandlerAxiosErrPrefix, LoadHeroFribbelsJSON, LoadHeroJSON } from '../../../../utils/api/help';
import { SkipToUrl } from '../../../../utils/helper'; 
import { PathHeroTemplateManage } from '../../../../const';
import { HeroSelect } from '../../../../utils/HeroSelect/HeroSelect';
import HeroImageShow from '../../../../utils/HeroImageShow/HeroImageShow';
import { HeroDetail, HeroDetailBackEnd, HeroFribbelsResult } from '../../../type';
import { EquipArtifactMultiSelect, EquipSetMultiSelect } from '../../../../utils/EquipSetSelect/EquipSetSelect';
// import { PathHeroTemplateManage } from '../../..';
const FormItem = Form.Item;

interface HeroTemplateFormProps {
    type: string;
}

export default function HeroTemplateForm(props: HeroTemplateFormProps) {
    const { id } = useParams();
    const [Once, setOnce] = useState(false)
    const [form] = Form.useForm();
    const [fresh, setFresh] = useState(false)

    if (props.type === "update" && Once === false) {
        setOnce(true)
        // http.get(HeroTemplateGetPath + "?ID=" + id).then((response) => {
        //     form.setFieldsValue({ ...response.data.Data })
        // }).catch(function (error) {
        //     Message.error(error)
        // })
    }

    const [{ data }, execute, _] = GetHeroDetail()
    let heroDetail: HeroDetailBackEnd = data?.Data
    console.log(heroDetail)
    
    useEffect(() => { }, [props])

    return (
        <div>
            <Form
                style={{ width: 600 }}
                autoComplete='off'
                form={form}
                size={"large"}
                onSubmit={(v) => {
                    // if (props.type === "update") {
                    //     http.put(HeroTemplateUpdatePath, { ID: id, NewInfo: v }).then((response:any) => {
                    //         Message.success("更新成功")
                    //         SkipToUrl(PathHeroTemplateManage)
                    //     }).catch(function (error:any) {
                    //         HandlerAxiosErrPrefix("更新模板失败:",error)
                    //     })
                    // } else if (props.type === "create") {
                    //     http.post(HeroTemplateCreatePath, v).then((response:any) => {
                    //         Message.success("创建成功")
                    //         SkipToUrl(PathHeroTemplateManage)
                    //     }).catch(function (error:any) {
                    //         HandlerAxiosErrPrefix("创建模板失败:", error)
                    //     })
                    // }
                }}
            >
                <FormItem label='角色' rules={[{ required: true }]}>
                    <HeroSelect HeroCode={form.getFieldValue("HeroCode")} OnChange={(heroCode:HeroDetail) => { 
                        form.setFieldValue("HeroCode", heroCode.heroCode)
                        execute({ params: { HeroCode: heroCode.heroCode } }).then().catch((error) => { HandlerAxiosErrPrefix("读取角色信息",error)})
                        setFresh(!fresh)
                    }}/>
                </FormItem>
                <FormItem label='角色模板名称' field='Name' rules={[{ required: true }]}>
                    <Input placeholder='请输入角色模板名称' />
                </FormItem>
                <FormItem label='使用套装' rules={[{ required: true }]}>
                    <EquipSetMultiSelect
                        noLabel={true}
                        EquipSet={form.getFieldValue("Set")}
                        onChange={(sets: string[]) => {
                            form.setFieldValue("Set", sets)
                            setFresh(!fresh)
                        }}
                        style={{width:300}}
                    />
                </FormItem>
                <FormItem label='使用神器' rules={[{ required: true }]}>
                    <EquipArtifactMultiSelect
                        Artifact={form.getFieldValue("Artifact")}
                        onChange={(sets: string[]) => {
                        form.setFieldValue("Artifact", sets)
                        setFresh(!fresh)
                    }}
                    />
                </FormItem>
                <FormItem label='属性配置' field='Name' rules={[{ required: true }]}>
                    <Input placeholder='请输入角色模板名称' />
                </FormItem>
                <FormItem wrapperCol={{ offset: 5 }}>
                    <Button type='primary' htmlType='submit' style={{ marginRight: 24 }}>
                        提交
                    </Button>
                </FormItem>
            </Form>
        </div>
    );
}