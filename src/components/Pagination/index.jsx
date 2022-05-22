import './pagination.css';
import { useDispatch, useSelector } from "react-redux";
import { pageSelector, productsSelector } from '../../redux/selectors';
import paginationSlice, { SIZE_PAGE } from '../../redux/paginationSlice';
import { useEffect, useState } from 'react';
export default function ({ total }) {
    const { first, last, page } = useSelector(pageSelector);
    const dispatch = useDispatch();
    const { status } = useSelector(productsSelector);
    useEffect(() => {
        dispatch(paginationSlice.actions.resetState(total));
    }, [total]);
    const handleNextPage = () => {
        dispatch(paginationSlice.actions.nextPage(total));
    }

    const handlePrevPage = () => {
        dispatch(paginationSlice.actions.prevPage());
    }
    return (
        <nav>
            <div className="pagination text-center">
                <div className="quantityPage mb-8 mt-16">
                    {status === 'loading' ? 0 : page} / {total === 0 ? 1 : total}
                </div>
                <button
                    className={
                        first ?
                            'btn-prev btn btn-sm btn-secondary me-8 disable' :
                            'btn-prev btn btn-sm btn-secondary me-8'
                    }
                    onClick={handlePrevPage}
                >Previous</button>
                <button
                    className={last ? 'btn-next btn btn-sm btn-secondary disable' : 'btn-next btn btn-sm btn-secondary'}
                    onClick={handleNextPage}
                >Next</button>
            </div>
        </nav>
    )
}