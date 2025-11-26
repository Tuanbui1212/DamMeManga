import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

<<<<<<< HEAD
=======
// Đăng ký TẤT CẢ các thành phần cần thiết - CHỈ 1 LẦN DUY NHẤT
>>>>>>> java/phungcuong
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default ChartJS;