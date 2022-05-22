import './footer.css';
import footerImages from './images-footer/footer_2.jpg';

export default function () {

    return (
        <footer className='footer'>
            <div className="container mt-32">
                <div className='text-center'>
                    <img src={footerImages} alt="shoe" className='footer__logo' />
                    <p>Shoes Store là sự lựa chọn hoàn hảo của bạn</p>
                </div>
                <ul className='footer__social d-flex-center mt-16'>
                    <li className='footer__social__item me-16'>
                        <i className="fa-brands fa-facebook i-facebook"></i>
                    </li>
                    <li className='footer__social__item me-16'>
                        <i className="fa-brands fa-instagram i-instagram"></i>
                    </li>
                    <li className='footer__social__item me-16'>
                        <i className="fa-brands fa-youtube i-youtube"></i>
                    </li>
                    <li className='footer__social__item me-16'>
                        <i className="fa-brands fa-twitter-square i-twitter"></i>
                    </li>
                    <li className='footer__social__item me-16'>
                        <i className="fa-brands fa-tiktok i-tiktok"></i>
                    </li>
                </ul>
                <div className='row mt-32 justify-content-between'>
                    <div className='col col-4'>
                        <h3 className='footer__category'>Chất Lượng</h3>
                        <p>
                            Shoes Store đảm bảo chất lượng cho tất cả
                            sản phẩm bán tại Store bằng chính sách bảo hành vĩnh viễn.
                        </p>
                        <h3 className='footer__category'>Phục Vụ</h3>
                        <p>
                            Store cam kết chất lượng phục vụ tốt nhất , chuyên nghiệp nhất cho
                            mọi khách hàng bằng chính sách hoàn tiền và tặng quà nếu nhân viên
                            phục vụ quý khách không chu đáo.
                        </p>
                        <h3 className='footer__category'>Hỗ Trợ</h3>
                        <p>
                            Nếu Bạn gặp rắc rối về sản phẩm hay chất lượng dịch vụ của Store , hãy gọi ngay số
                            0900 988 775.
                        </p>

                    </div>
                    <div className='col col-4'>
                        <h3 className='footer__category'>Đặt Hàng Toàn Quốc</h3>
                        <p><i className="fa-solid fa-square-phone"></i> 1900 633 349</p>
                        <h3 className='footer__category'>Thông Tin</h3>
                        <ul>
                            <li><i className="fa-solid fa-angle-right"></i> Giới thiệu về Store</li>
                            <li><i className="fa-solid fa-angle-right"></i> Tuyển dụng</li>
                            <li><i className="fa-solid fa-angle-right"></i> Quy chế hoạt dộng</li>
                            <li><i className="fa-solid fa-angle-right"></i> Chính sách và quy định</li>
                        </ul>
                    </div>
                    <div className='col col-4'>
                        <h3 className='footer__category'>CSKH</h3>
                        <p>Góp ý / Chăm Sóc Khách Hàng</p>
                        <h3 className='footer__category'>FAQ</h3>
                        <ul>
                            <li><i className="fa-solid fa-angle-right"></i> Vận chuyển</li>
                            <li><i className="fa-solid fa-angle-right"></i> Chính sách đổi trả</li>
                            <li><i className="fa-solid fa-angle-right"></i> Chính sách bảo hành</li>
                        </ul>
                    </div>

                </div>
                <div className='footer_coppyright text-center pb-32'>
                    <p>© 2022 - Coppy right by team Four Friends</p>
                </div>

            </div>
        </footer >
    )
}
