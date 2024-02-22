import React, {useEffect,useState} from "react";
import '../index.css'
import "antd/dist/antd.css";
import {getFio} from '../action/actions'
import {groupClient,groupDoctor} from '../components/SelectValue'
import _ from 'lodash';

import {  Form, Button, Checkbox,Select,Modal,AutoComplete,Row,Col } from "antd";
import {useDispatch, useSelector} from "react-redux";
import { MaskedInput } from "antd-mask-input";

function DynamicRule(props) {
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const [Fio, setFio] = useState([]);
    const [selectItems, setSelectItems] = useState([]);
    const [saveData, setSaveData] = useState({});

    const listFio = useSelector(state => state.todos.fio);

    const handleChangeWithDebounce = _.debounce(async (val) => {
        if (val) {
            dispatch(getFio(val))
        }
    }, 1000);

    useEffect(()=>{
        if(listFio && listFio.length > 0){
            setFio(listFio)
        }
    },[listFio])

    const { getFieldDecorator } = props.form;
    const { Option } = Select;


    const handleSubmit = (e) => {
        e.preventDefault();

        props.form.validateFields((err, values) => {
            if (!err) {
               setOpen(true)
            }
        });
    };

    const handleOk = () => {
        setOpen(false);
    };
    const handleCancel = () => {
        setOpen(false);
    };

    const handleSave = (val,type)=>{
        saveData[type] = val;
        setSaveData(saveData)
    }


    return (

        <Row>
            <Col span={12} xs={24} md={12} xl={12} >
             <div style={{padding:20}}>
                {open &&  <Modal
                    visible={true}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <p>{JSON.stringify(saveData)}</p>
                </Modal>}
                <Form onSubmit={handleSubmit} >
                    <Form.Item
                        label="ФИО"
                    >
                        {getFieldDecorator("username", {
                            rules: [{ required: true, message: "Введите ФИО" }]
                        })(
                            <AutoComplete
                                onChange={handleChangeWithDebounce}
                                onSelect={(value)=>{handleSave(value,'fio')}}
                                dataSource={Fio}
                                placeholder="Введите ФИО"
                                filterOption={(inputValue, option) =>
                                    option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                }
                            />
                        )}
                    </Form.Item>

                    <Form.Item
                        label="Дата рождения"
                    >
                        {getFieldDecorator("birdDay", {
                            rules: [
                                {
                                    required: true,
                                    pattern: new RegExp("(([012]{1})?[0-9]{1}|[3]?[01]{1})\/(([0]{1})?[0-9]{1}|[1]{1}?[012]{1})\/([12]{1}[09]{1}[0-9]{2})"),
                                    message: "Введите Дату Рождения"
                                }
                            ]
                        })(
                            <MaskedInput
                                onChange={(e)=>{handleSave(e.target.value,'birthday')}}
                                mask="00/00/0000"
                            />
                        )}
                    </Form.Item>



                    <Form.Item
                        label="Номер телефона 2"
                    >
                        {getFieldDecorator("phoneNumber", {
                            rules: [
                                {
                                    required: true,
                                    pattern: new RegExp("(\\+7|8)[\\s(]*\\d{3}[)\\s]*\\d{3}[\\s-]?\\d{2}[\\s-]?\\d{2}"),
                                    message: "Не правильно введен номер телефона!"
                                }
                            ]
                        })(
                            <MaskedInput
                                onChange={(e)=>{handleSave(e.target.value,'phoneNumber')}}
                                mask="+7 (000) 000-00-00" />
                        )}
                    </Form.Item>


                    <Form.Item
                        label="Пол"
                    >
                        {getFieldDecorator("select", {
                            rules: [{type: 'string', required: false, message: 'Выбирите пол !'}]
                        })(
                            <Select
                                placeholder={'Выбирите пол'}
                                onChange={(value)=>{
                                    handleSave(value,'male')
                                }}
                            >
                                <Option key={'Man'} value="Man">Мужской</Option>
                                <Option key={'Woman'} value="Woman">Женский</Option>
                            </Select>
                        )}
                    </Form.Item>

                    <Form.Item
                        label="Группа клиентов"
                    >
                        {getFieldDecorator("group", {
                            valuePropName: 'option',
                            rules: [{required: true, message: 'Выбирите группа клиентов'}]
                        })(
                            <Select
                                mode="multiple"
                                placeholder={'Выбирите группа клиентов'}
                                onChange={(val)=>{
                                    handleSave(val,'group');
                                    setSelectItems(val)
                                }}
                            >
                                {groupClient().map((item)=>{
                                    return  <Option  key={item}  value={item}>{item}</Option>
                                })}

                            </Select>
                        )}
                    </Form.Item>


                    <Form.Item
                        label="Лечащий врач"
                    >
                        {getFieldDecorator("doctor", {
                            rules: [{type: 'string', required: false, message: 'Выбирите лечащего врача'}]
                        })(
                            <Select
                                onChange={(value)=>{
                                    handleSave(value,'doctor')
                                }}
                                placeholder={'Выбирите лечащего врача'}
                            >
                                {groupDoctor().map((item)=>{
                                    return     <Option key={item} value={item}>{item}</Option>
                                })}
                            </Select>
                        )}
                    </Form.Item>


                    <Form.Item
                        className={'columnBlock'}
                    >
                        {getFieldDecorator("remember", {
                        })(<Checkbox onChange={(e)=>{
                            handleSave(e.target.checked,'checked')
                        }}
                        >Не отправлять СМС</Checkbox>)}

                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                        >
                           Отправить
                        </Button>

                    </Form.Item>
                </Form>
            </div></Col>
            <Col span={12} xs={0} md={0} xl={0} />
        </Row>



    );
}

export default Form.create()(DynamicRule);
