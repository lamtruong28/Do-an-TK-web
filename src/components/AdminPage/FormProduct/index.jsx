import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, editProduct, fetchProducts } from '../../../redux/productSlice';
import { formSelector } from '../../../redux/selectors';
import { toBase64 } from '../../../services';
import { modalSlice } from '../../Modal/modalSlice';
import './formProduct.css';

export default function () {
    const dispatch = useDispatch();
    const { typeForm, dataPayload } = useSelector(formSelector);
    const [states, setStates] = useState({
        name: '',
        description: '',
        price: '',
        promotion: '',
        attachment: '',
        type: '',
    })
    const { name, description, price, promotion, attachment, type } = states;

    useEffect(() => {
        if (typeForm === 'edit')
            setStates({
                name: dataPayload.name,
                description: dataPayload.description,
                price: dataPayload.price,
                attachment: dataPayload.attachment,
                type: dataPayload.type,
            });
    }, []);

    const handleChooseImage = async (e) => {
        const file = e.target.files[0];
        const base64 = await toBase64(file);
        setStates({
            ...states,
            attachment: base64,
        })
    }

    const resetStates = () => {
        setStates({
            name: '',
            description: '',
            price: '',
            promotion: '',
            attachment: '',
            type: '',
        });
    }
    const onchangeInput = (e, payload) => {
        const coppy = { ...states };
        coppy[payload] = e.target.value;
        setStates(coppy);
    }
    const handleCancel = () => {
        dispatch(modalSlice.actions.closeModal());
        resetStates();
    }
    const handleClickBtn = async () => {
        dispatch(modalSlice.actions.closeModal());
        if (typeForm === 'addNew') {
            const payload = { sold: 0, ...states };
            dispatch(addProduct(payload));
        }
        else {
            const payload = { id: dataPayload.id, ...states };
            await dispatch(editProduct(payload));
            dispatch(fetchProducts());
        }
        resetStates();
    }

    return (
        <div className="form-product p-32 rounded" onClick={e => e.stopPropagation()}>
            <h1 className='text-center mb-16'>
                {
                    typeForm === 'addNew' ? 'Th??m s???n ph???m' : 'S???a s???n ph???m'
                }
            </h1>
            <div className="wrap rounded">
                <div className="position-relative">
                    <input
                        autoFocus
                        className='w-100 p-8'
                        type="text"
                        placeholder=" "
                        value={name}
                        onChange={(e) => onchangeInput(e, 'name')}
                    />
                    <span>T??n s???n ph???m *</span>
                </div>
                <div className="position-relative mt-16">
                    <textarea
                        className='w-100 p-8'
                        type="text" placeholder=' '
                        value={description}
                        onChange={(e) => onchangeInput(e, 'description')}
                    ></textarea>
                    <span className='desc'>M?? t??? s???n ph???m</span>
                </div>
                <div className="position-relative mt-16">
                    <select onChange={(e) => onchangeInput(e, 'type')} value={type} className={type !== '' ? 'w-100 p-8 choice active' : 'w-100 p-8 choice'}>
                        <option hidden value="">----------Ch???n----------</option>
                        <option className='p-8' value="male">Gi??y nam</option>
                        <option className='p-8' value="female">Gi??y N???</option>
                        <option className='p-8' value="bag">Balo - T??i s??ch</option>
                        <option className='p-8' value="accessory">Ph??? ki???n</option>
                    </select>
                </div>
                <div className="position-relative mt-16">
                    <input
                        className='w-100 p-8 price'
                        type="number"
                        placeholder=" "
                        value={price}
                        onChange={(e) => onchangeInput(e, 'price')}
                    />
                    <span>Gi??</span>
                </div>
                <div className="position-relative mt-16">
                    <input
                        className='w-100 p-8 price'
                        type="number"
                        placeholder=" "
                        value={promotion}
                        onChange={(e) => onchangeInput(e, 'promotion')}
                    />
                    <span>Gi?? khuy???n m??i (kh??ng b???t bu???c)</span>
                </div>
                {
                    attachment &&
                    <div className="attachment-wrap mt-16 mb-2">
                        <div className="attachment-list">
                            <div className="attachment-wrap-item">
                                {
                                    <div className="attachment-item">
                                        <img src={attachment} width='100%' height='100%' alt='' />
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                }
                <div className="mt-16">
                    <input onChange={handleChooseImage} type="file" id='open-directory' hidden />
                    <label htmlFor='open-directory' className="btn btn-primary">{typeForm === 'addNew' ? 'Ch???n h??nh' : 'Thay ?????i h??nh'}</label>
                </div>
            </div>
            <div className="control mt-8">
                <button
                    className='btn btn-secondary ms-4'
                    onClick={handleCancel}
                >????ng</button>
                <button
                    className='btn btn-primary ms-4'
                    onClick={handleClickBtn}
                >{typeForm === 'addNew' ? 'Th??m m???i' : 'L??u'}</button>
            </div>
        </div >
    )
};