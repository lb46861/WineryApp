import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const options = {
	position: 'bottom-left',
	autoClose: 3000,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	progress: undefined,
	theme: 'dark'
};

const successToast = (message) =>
	toast.success(message, options);


export { successToast };
