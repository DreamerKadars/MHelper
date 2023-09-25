import React, { useState, useEffect } from "react";
import "@arco-design/web-react/dist/css/arco.css";
import { Form, Image as ArcoImage, Link, Table, Input, Button, Checkbox, Popover, Card, Modal, Message } from "@arco-design/web-react";
import { HandlerAxiosErrPrefix, Login, LoginReq } from "../../utils/api/help";
import { SkipToUrl } from "../../utils/helper";
const FormItem = Form.Item;

export const MLogin = () => {
    const [form] = Form.useForm();
    const [{ data, loading, error }, execute, refetch] = Login()

    return <Form
        style={{ width: 600 }}
        form={form}
        onSubmit={(v) => {
            var req: LoginReq = { username: v?.username, password: v?.password }
            execute({ data: req }).then(() => {
                Message.success("登录成功")
                SkipToUrl("/Admin")
            }).catch((err) => {
                HandlerAxiosErrPrefix("登录失败:",err)
            })
        }}
        autoComplete='off'>
        <FormItem rules={[{ required: true }]} label='用户名' field={"username"}>
            <Input placeholder='用户名' />
        </FormItem>
        <FormItem label='密码' field={"password"}>
            <Input placeholder='密码' />
        </FormItem>
        <FormItem wrapperCol={{ offset: 5 }}  >
            <Button type='primary' htmlType='submit'>提交</Button>
        </FormItem>
    </Form>
}

export default MLogin;