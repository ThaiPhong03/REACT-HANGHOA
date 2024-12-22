import React, { useEffect, useState } from 'react';
import axios from 'axios';
//import './HangHoaTable.css'; // Nếu bạn muốn thêm CSS riêng cho bảng

const HangHoaTable = () => {
    const [hangHoas, setHangHoas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHangHoas = async () => {
            try {
                const response = await axios.get('http://localhost:5247/api/HangHoas');
                setHangHoas(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchHangHoas();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error fetching data: {error.message}</p>;

    return (
        <div>
            <h2>Danh Sách Hàng Hóa</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Mã</th>
                        <th>Tên</th>
                        <th>Đơn Vị</th>
                        <th>Giá Nhập</th>
                        <th>Giá Bán</th>
                        <th>Người Tạo</th>
                        <th>Ngày Tạo</th>
                    </tr>
                </thead>
                <tbody>
                    {hangHoas.map((hangHoa) => (
                        <tr key={hangHoa.id}>
                            <td>{hangHoa.id}</td>
                            <td>{hangHoa.ma}</td>
                            <td>{hangHoa.ten}</td>
                            <td>{hangHoa.donVi}</td>
                            <td>{hangHoa.giaNhap}</td>
                            <td>{hangHoa.giaBan}</td>
                            <td>{hangHoa.nguoiTao}</td>
                            <td>{new Date(hangHoa.ngayTao).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default HangHoaTable;