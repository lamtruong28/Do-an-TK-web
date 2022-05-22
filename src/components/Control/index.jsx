import { useDispatch, useSelector } from "react-redux"
import productSlice from "../../redux/productSlice";
import { productsSelector } from "../../redux/selectors";


export default function () {
    const dispatch = useDispatch();
    const { type } = useSelector(productsSelector);

    const styles = {
        fontSize: '1.6rem',
        cursor: 'pointer',
        color: 'var(--text-body-color)'
    }
    const handleChoice = (e) => {
        dispatch(productSlice.actions.setType(e.target.value));
    }
    return (
        <div className="control-choice d-flex-center-y mt-16">
            <div className="all me-8">
                <input
                    checked={type === 'all'}
                    value='all'
                    id="all"
                    type="radio"
                    name="control"
                    onChange={handleChoice}
                />
                <label
                    className="ms-4"
                    style={styles}
                    htmlFor="all"
                >Tất cả</label>
            </div>
            <div className="male me-8">
                <input
                    checked={type === 'male'}
                    value='male'
                    id="male"
                    type="radio"
                    name="control"
                    onChange={handleChoice}
                />
                <label
                    className="ms-4"
                    style={styles}
                    htmlFor="male"
                >Giày nam</label>
            </div>
            <div className="female me-8">
                <input
                    checked={type === 'female'}
                    value='female'
                    id="female"
                    type="radio"
                    name="control"
                    onChange={handleChoice}
                />
                <label
                    className="ms-4"
                    style={styles}
                    htmlFor="female"
                >Giày nữ</label>
            </div>
            <div className="bag me-8">
                <input
                    checked={type === 'bag'}
                    value='bag'
                    id="bag"
                    type="radio"
                    name="control"
                    onChange={handleChoice}
                />
                <label
                    className="ms-4"
                    style={styles}
                    htmlFor="bag"
                >Balo - Túi sách</label>
            </div>
            <div className="accessory me-8">
                <input
                    checked={type === 'accessory'}
                    value='accessory'
                    id="accessory"
                    type="radio"
                    name="control"
                    onChange={handleChoice}
                />
                <label
                    className="ms-4"
                    style={styles}
                    htmlFor="accessory"
                >Phụ kiện</label>
            </div>
        </div>
    )
}