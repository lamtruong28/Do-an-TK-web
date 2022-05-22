import Modal from '../Modal';
import AddNewButton from './Button/AddNewButton';
import FormProduct from './FormProduct';
import HeaderAdmin from './HeaderAdmin';
import ProductTable from './ProductTable';

export default function () {
    return (
        <div className="admin">
            <HeaderAdmin />
            <ProductTable />
            <AddNewButton />
            <Modal>
                <FormProduct />
            </Modal>
        </div>
    )
};