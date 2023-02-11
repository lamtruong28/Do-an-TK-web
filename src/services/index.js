import { toast } from "react-toastify";
import { api } from "../API";
import { addToCart, fetchCarts } from "../redux/cartSlice";
import { UpdateProdSold, fetchProducts } from "../redux/productSlice";

export const toBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
});

export const rememberUser = ({ id, userName }) => {
    localStorage.setItem('info', JSON.stringify({ isLogin: true, userId: id, userName: userName }));
}

export const cancelRememberUser = () => {
    const data = JSON.parse(localStorage.getItem('info'));
    data.isLogin = false;
    data.userId = null;
    data.userName = null;
    localStorage.setItem('info', JSON.stringify(data));
}

export const checkRememberUser = () => {
    const result = JSON.parse(localStorage.getItem('info')) || false;
    return result;
}
export const checkExistCart = ({ cartList, productId, userId }) => {
    const result = cartList.find((item) => (item.userId === userId && item.productId === productId));
    return result;
}

export const middlewareBuy = async ({ userId, product, navigate, dispatch, quantity }) => {
    if (userId) {
        const payload = { prodCode: product.prodCode, sold: product.sold };
        payload['sold'] = parseInt(product.sold) + parseInt(quantity);
        await dispatch(UpdateProdSold(payload));
        await dispatch(fetchProducts());

        const { prodCode } = product;
        const date = new Date();
        const time = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        const price = product.promotion != 0 ? product.promotion : product.price;
        const payload2 = {
            ID: userId,
            prodCode,
            price: price,
            quantity: quantity,
            total: parseInt(price) * parseInt(quantity),
            createdAt: time
        }
        const res = await api.post(`/bill/addBill.php`, payload2);
        if(res.data == 1) {
            toast.success("Cảm ơn bạn đã tin tưởng shop. Shop sẽ gởi hàng cho bạn trong vòng 24h!");
            return 1;
        }
        else {
            toast.success("Có lỗi xảy ra! Vui lòng thử lại sau!");
            return 0;
        }
    } else
        navigate('/sign-in');
}

export const middlewareAddCart = async ({ dispatch, product, quantity, userId }) => {
    const { prodCode } = product;
    const date = new Date();
    const time = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    const payload = {
        ID: userId,
        prodCode,
        quantity: quantity || 1,
        createdAt: time
    }
    const res = await dispatch(addToCart(payload));
    if (res.payload) {
        toast.success('Đã thêm sản phẩm vào giỏ hàng!');
        dispatch(fetchCarts(userId));
    }
    else
        toast.error('Sản phẩm đã tồn tại trong giỏ hàng! Vui lòng kiểm tra lại giỏ hàng của bạn. Xin cảm ơn!');
}

export const checkInfoResetPass = ({ users, email, userName }) => {
    const res = users.find(user => (user.email === email && user.userName === userName));
    return res;
}

export const toEnglish = (str) => {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g, " ");
    str = str.trim();
    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, "");
    return str;
};
