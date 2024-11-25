import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdatePage = () => {
  const { id } = useParams(); // URL에서 ID 추출
  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    website: "",
  });
  const [originalData, setOriginalData] = useState({}); // 원본 데이터 저장
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateCount, setUpdateCount] = useState(0); // 변경 횟수

  // Ref로 유효성 검증
  const nameInputRef = useRef(null);

  useEffect(() => {
    if (!id) {
      setLoading(false); // ID가 없는 경우 로딩 종료
      return;
    }

    const fetchStudent = async () => {
      try {
        const response = await fetch(`https://672f3fc9229a881691f25065.mockapi.io/users/${id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch student data. Status: ${response.status}`);
        }
        const data = await response.json();
        setFormData(data);
        setOriginalData(data); // 원본 데이터 저장
      } catch (error) {
        console.error("Error fetching student data:", error);
        setError("학생 데이터를 불러오는 중 문제가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleInputBlur = async (e) => {
    const { name, value } = e.target;

    if (originalData[name] !== value) {
      setUpdateCount((prevCount) => prevCount + 1); // 변경 횟수 증가

      try {
        await fetch(`https://672f3fc9229a881691f25065.mockapi.io/users/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...formData, [name]: value }),
        });
        setOriginalData((prevOriginal) => ({
          ...prevOriginal,
          [name]: value,
        })); // 원본 데이터 동기화
      } catch (error) {
        console.error("Error updating field:", error);
      }
    }
  };

  const handleSave = () => {
    if (!formData.name.trim()) {
      nameInputRef.current.focus();
      alert("이름은 필수 입력 값입니다.");
      return;
    }
    alert("저장되었습니다!");
  };

  if (loading) {
    return <p>로딩 중...</p>;
  }

  if (!id) {
    return (
      <div className="container mt-4" style={{ textAlign: "center" }}>
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            color: "#333",
            marginBottom: "1.5rem",
          }}
        >
          URL에 유효한 ID를 입력해야 수정 페이지에 접근할 수 있습니다.
        </h1>
        <button
          onClick={() => navigate("/list")}
          style={{
            fontSize: "1rem",
            padding: "0.5rem 1rem",
            backgroundColor: "#007bff",
            color: "white",
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

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <h1 style={{ fontSize: "2rem", color: "#f00" }}>{error}</h1>
        <button
          onClick={() => navigate(-1)}
          style={{
            fontSize: "1rem",
            padding: "0.5rem 1rem",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "0.3rem",
            cursor: "pointer",
            marginTop: "1rem",
          }}
        >
          뒤로가기
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-4" style={{ textAlign: "center" }}>
      <h1
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
          color: "#333",
          marginBottom: "1.5rem",
        }}
      >
        학생 정보 수정
      </h1>
      <p style={{ marginBottom: "1rem", fontSize: "1rem", color: "#555" }}>
        변경 횟수: <span style={{ fontWeight: "bold" }}>{updateCount}</span>
      </p>
      <div
        className="card"
        style={{
          margin: "0 auto",
          padding: "1.5rem",
          border: "1px solid #ddd",
          borderRadius: "0.5rem",
          maxWidth: "500px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <div className="card-body">
          {Object.keys(formData).map((field) => (
            <div key={field} className="mb-3">
              <label
                htmlFor={field}
                className="form-label"
                style={{ display: "block", textAlign: "left", fontWeight: "bold", marginBottom: "0.5rem" }}
              >
                {field}
              </label>
              <input
                id={field}
                type="text"
                name={field}
                value={formData[field] || ""}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                className="form-control"
                ref={field === "name" ? nameInputRef : null}
                style={{
                  padding: "0.5rem",
                  border: "1px solid #ccc",
                  borderRadius: "0.3rem",
                  width: "100%",
                }}
              />
            </div>
          ))}
          <div className="d-flex justify-content-between" style={{ marginTop: "1rem" }}>
            <button
              className="btn btn-secondary"
              onClick={() => navigate(-1)}
              style={{
                fontSize: "1rem",
                padding: "0.5rem 1rem",
                backgroundColor: "#6c757d",
                color: "white",
                border: "none",
                borderRadius: "0.3rem",
                cursor: "pointer",
              }}
            >
              뒤로가기
            </button>
            <button
              className="btn btn-primary"
              onClick={handleSave}
              style={{
                fontSize: "1rem",
                padding: "0.5rem 1rem",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "0.3rem",
                cursor: "pointer",
              }}
            >
              저장
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePage;
