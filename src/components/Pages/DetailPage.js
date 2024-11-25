import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const DetailPage = ({ isBasePage = false }) => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isBasePage || !id) { 
      setLoading(false); 
      return;
    }

    const fetchStudent = async () => {
      try {
        const response = await fetch(`https://672f3fc9229a881691f25065.mockapi.io/users/${id}`);
        const data = await response.json();
        setStudent(data);
      } catch (error) {
        console.error("Error fetching student data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id, isBasePage]);

  if (loading) {
    return <p>로딩 중...</p>;
  }

  if (isBasePage || !id) {
    return (
      <div
        className="container"
        style={{
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            color: "#333",
            marginBottom: "1.5rem",
          }}
        >
          URL에 ID를 입력해주시면 상세 정보가 출력됩니다.
        </h1>
        <button
          onClick={() => navigate("/list")}
          className="btn btn-secondary mt-3"
          style={{
            fontSize: "1rem",
            fontWeight: "600",
            backgroundColor: "#007bff",
            color: "white",
            padding: "0.5rem 1rem",
            border: "none",
            borderRadius: "0.3rem",
            cursor: "pointer",
          }}
        >
          목록으로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <div
      className="container"
      style={{
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <h1
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
          color: "#333",
          marginBottom: "1.5rem",
        }}
      >
        학생 상세 정보
      </h1>
      {student ? (
        <div
          className="card"
          style={{
            margin: "2rem auto",
            padding: "1.5rem",
            border: "1px solid #ddd",
            borderRadius: "0.5rem",
            maxWidth: "500px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <div className="card-body">
            <h5
              className="card-title"
              style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" }}
            >
              {student.name}
            </h5>
            <p className="card-text" style={{ marginBottom: "0.5rem" }}>
              아이디: {student.username}
            </p>
            <p className="card-text" style={{ marginBottom: "0.5rem" }}>
              이메일: {student.email}
            </p>
            <p className="card-text" style={{ marginBottom: "0.5rem" }}>
              전화번호: {student.phone}
            </p>
            <p className="card-text" style={{ marginBottom: "0.5rem" }}>
              웹사이트: {student.website}
            </p>
            <button
              onClick={() => navigate("/list")}
              className="btn btn-primary"
              style={{
                fontSize: "1rem",
                fontWeight: "600",
                backgroundColor: "#007bff",
                color: "white",
                padding: "0.5rem 1rem",
                border: "none",
                borderRadius: "0.3rem",
                cursor: "pointer",
              }}
            >
              목록으로 돌아가기
            </button>
          </div>
        </div>
      ) : (
        <h1>해당 ID의 학생 데이터를 찾을 수 없습니다.</h1>
      )}
    </div>
  );
};

export default DetailPage;
