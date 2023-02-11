import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { baseURL } from '../../../API';
import { addProduct, editProduct, fetchProducts } from '../../../redux/productSlice';
import { formSelector } from '../../../redux/selectors';
import { modalSlice } from '../../Modal/modalSlice';
import './formProduct.css';

export default function () {
    const dispatch = useDispatch();
    const { typeForm, dataPayload } = useSelector(formSelector);
    const [states, setStates] = useState({
        prodName: '',
        description: '',
        price: '',
        promotion: '',
        image: '',
        prodTypeCode: '',
    })
    const { prodName, description, price, promotion, image, prodTypeCode } = states;
    const [selectImage, setSelectImage] = useState(false);
    const [imagePrev, setImagePrev] = useState();
    useEffect(() => {
        if (typeForm === 'edit')
            setStates({
                prodName: dataPayload.prodName,
                description: dataPayload.description,
                price: dataPayload.price,
                promotion: dataPayload.promotion,
                image: dataPayload.image,
                prodTypeCode: dataPayload.prodTypeCode,
            });
    }, []);

    useEffect(() => {
        //Cleanup:
        return () => {
            URL.revokeObjectURL(imagePrev?.prevImage); //xóa bỏ ảnh tạm khỏi bộ nhớ tránh rò rỉ bộ nhớ
        }
    }, [imagePrev]);

    const handleChooseImage = async (e) => {
        setSelectImage(true);
        const file = e.target.files[0];
        file.prevImage = URL.createObjectURL(file);
        setImagePrev(file);
        setStates({
            ...states,
            image: file
        })
    }
    const resetStates = () => {
        setStates({
            prodName: '',
            description: '',
            price: '',
            promotion: '',
            image: '',
            prodTypeCode: '',
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
        if (!prodName) {
            toast.warning("Vui lòng nhập tên sản phẩm!");
            return;
        }
        if (!prodTypeCode) {
            toast.warning("Vui lòng chọn loại sản phẩm!");
            return;
        }
        if (!price) {
            toast.warning("Vui lòng nhập giá sản phẩm!");
            return;
        }
        if (!image) {
            toast.warning("Vui lòng chọn hình sản phẩm!");
            return;
        }
        dispatch(modalSlice.actions.closeModal());
        if (selectImage) {
            const formData = new FormData();
            formData.append("image", image, image.name);
        }
        if (typeForm === 'addNew') {
            const payload = { sold: 0, ...states };
            await dispatch(addProduct(payload));
        }
        else {
            const payload = { prodCode: dataPayload.prodCode, isChangeImage: selectImage, imageOld: dataPayload.image, ...states };
            await dispatch(editProduct(payload));
        }
        setSelectImage(false);
        await dispatch(fetchProducts());
        resetStates();
    }
    return (
        <div className="form-product p-32 rounded" onClick={e => e.stopPropagation()}>
            <h1 className='text-center mb-16'>
                {
                    typeForm === 'addNew' ? 'Thêm sản phẩm' : 'Sửa sản phẩm'
                }
            </h1>
            <div className="wrap rounded">
                <div className="position-relative">
                    <input
                        autoFocus
                        className='w-100 p-8'
                        type="text"
                        placeholder=" "
                        value={prodName}
                        onChange={(e) => onchangeInput(e, 'prodName')}
                    />
                    <span>Tên sản phẩm *</span>
                </div>
                <div className="position-relative mt-16">
                    <textarea
                        className='w-100 p-8'
                        type="text" placeholder=' '
                        value={description}
                        onChange={(e) => onchangeInput(e, 'description')}
                    ></textarea>
                    <span className='desc'>Mô tả sản phẩm</span>
                </div>
                <div className="position-relative mt-16">
                    <select onChange={(e) => onchangeInput(e, 'prodTypeCode')} value={prodTypeCode} className={prodTypeCode !== '' ? 'w-100 p-8 choice active' : 'w-100 p-8 choice'}>
                        <option hidden value="">----------Chọn----------</option>
                        <option className='p-8' value="male">Giày nam</option>
                        <option className='p-8' value="female">Giày Nữ</option>
                        <option className='p-8' value="bag">Balo - Túi sách</option>
                        <option className='p-8' value="accessory">Phụ kiện</option>
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
                    <span>Giá</span>
                </div>
                <div className="position-relative mt-16">
                    <input
                        className='w-100 p-8 price'
                        type="number"
                        placeholder=" "
                        value={promotion}
                        onChange={(e) => onchangeInput(e, 'promotion')}
                    />
                    <span>Giá khuyễn mãi (không bắt buộc)</span>
                </div>
                {
                    image && !selectImage &&
                    <div className="attachment-wrap mt-16 mb-2">
                        <div className="attachment-list">
                            <div className="attachment-wrap-item">
                                {
                                    <div className="attachment-item">
                                        <img src={baseURL + '/products/' + image} width='100%' height='100%' alt='' />
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                }
                {
                    imagePrev &&
                    <div className="attachment-wrap mt-16 mb-2">
                        <div className="attachment-list">
                            <div className="attachment-wrap-item">
                                {
                                    <div className="attachment-item">
                                        <img src={imagePrev.prevImage} width='100%' height='100%' alt='' />
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                }
                <div className="mt-16">
                    <input onChange={handleChooseImage} type="file" accept='image/*' id='open-directory' hidden />
                    <label htmlFor='open-directory' className="btn btn-primary">{typeForm === 'addNew' ? 'Chọn hình' : 'Thay đổi hình'}</label>
                </div>
            </div>
            <div className="control mt-8">
                <button
                    className='btn btn-secondary ms-4'
                    onClick={handleCancel}
                >Đóng</button>
                <button
                    className='btn btn-primary ms-4'
                    onClick={handleClickBtn}
                >{typeForm === 'addNew' ? 'Thêm mới' : 'Lưu'}</button>
            </div>
        </div >
    )
};