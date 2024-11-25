import React, { useState, useEffect } from "react";

const ShowList = () => {
  const [students, setStudents] = useState([]); 
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    website: "",
    province: "",
    city: "",
    district: "",
    street: "",
  }); // 폼 데이터
  const [editingId, setEditingId] = useState(null); 
  const [modalVisible, setModalVisible] = useState(false); 

  // 학생 데이터 ㅎget
  const fetchStudents = async () => {
    try {
      const response = await fetch("https://672f3fc9229a881691f25065.mockapi.io/users");
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  // 컴포넌트가 처음 렌더링될 때 학생 데이터 가져오기
  useEffect(() => {
    fetchStudents();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // modal
  const openAddModal = () => {
    setFormData({
      name: "",
      username: "",
      email: "",
      phone: "",
      website: "",
      province: "",
      city: "",
      district: "",
      street: "",
    });
    setEditingId(null);
    setModalVisible(true);
  };

  // modal close
  const closeModal = () => {
    setModalVisible(false);
  };

  const saveData = async () => {
    try {
      const url = editingId
        ? `https://672f3fc9229a881691f25065.mockapi.io/users/${editingId}`
        : "https://672f3fc9229a881691f25065.mockapi.io/users";

      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({
          name: "",
          username: "",
          email: "",
          phone: "",
          website: "",
          province: "",
          city: "",
          district: "",
          street: "",
        });
        setEditingId(null);
        closeModal();
        fetchStudents();
      } else {
        console.error("Error saving data:", response.statusText);
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  // 학생 수정
  const editData = (student) => {
    setFormData(student);
    setEditingId(student.id);
    setModalVisible(true);
  };

  const deleteData = async (id) => {
    try {
      const response = await fetch(`https://672f3fc9229a881691f25065.mockapi.io/users/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchStudents();
      } else {
        console.error("Error deleting data:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h1 style={{ display: "flex", justifyContent: "center" }}>학생 관리 시스템</h1>
      <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
        <button className="btn btn-primary" onClick={fetchStudents}>
          학생 조회
        </button>
        <button className="btn btn-success" onClick={openAddModal}>
          학생 추가
        </button>
      </div>

      {/* 학생 리스트 */}
      <div id="contents" className="mt-4">
        <ul>
          {students.map((student) => (
            <li key={student.id} className="mb-3">
              <strong>{student.name}</strong><br />
              아이디: {student.username}<br />
              이메일: {student.email}<br />
              전화번호: {student.phone}<br />
              웹사이트: <a href={student.website} target="_blank" rel="noopener noreferrer">{student.website}</a><br />
              주소: {student.province} {student.city} {student.district} {student.street} <br />
              <button
                className="btn btn-warning me-2"
                onClick={() => editData(student)}
              >
                수정
              </button>
              <button
                className="btn btn-danger"
                onClick={() => deleteData(student.id)}
              >
                삭제
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* modal */}
      {modalVisible && (
        <div className="modal show d-block" style={{ background: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{editingId ? "학생 수정" : "학생 추가"}</h5>
                <button className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                {Object.keys(formData).map((field) => (
                  <input
                    key={field}
                    type="text"
                    name={field}
                    placeholder={field}
                    value={formData[field]}
                    onChange={handleInputChange}
                    className="form-control mb-2"
                  />
                ))}
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={closeModal}>
                  닫기
                </button>
                <button className="btn btn-primary" onClick={saveData}>
                  저장
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowList;
