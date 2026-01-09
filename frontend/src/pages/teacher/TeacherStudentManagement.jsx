import React, { useState } from "react";
import TeacherHeader from "../../components/layout/TeacherHeader";
import TeacherSidebar from "../../components/layout/TeacherSidebar";
import { Table, Input, Select, Button, Space, Tag, Modal, Avatar, Breadcrumb } from "antd";
import {
  SearchOutlined,
  EyeOutlined,
  MessageOutlined,
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

export default function TeacherStudentManagement() {
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [courseFilter, setCourseFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [students, setStudents] = useState([
    {
      key: "1",
      id: "1",
      name: "Nguyễn Văn An",
      email: "an.nguyen@example.com",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDMImH-k7cQOJDV70K1j4gw0Y7SJWg0ntPdZ55STBM-gnEqS8I06dR0uhQzAmt5BzYxbGLQrGKKPwJew44hAXlYPxGFRi9YLA-FBvw2PhoQa1m9OMCIw9wNY-oobG_LP--DZwGmpPdxiJI01Wjs8eTEyPYpsPj-zJpteRhfYbdOl4pMZgXxPw41GqUKPPCfHeqHryHMu7JAkifEelLtK_3UHcn3t269G4m0ydTsYIKBJ4MUTjSCnbM47Y-CozCvnsHhby4LrmXgCPw",
      course: "Lập trình ReactJS",
      courseCode: "K14 - 2023",
      progress: 75,
      status: "active",
    },
    {
      key: "2",
      id: "2",
      name: "Trần Thị Bình",
      email: "binh.tran@example.com",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCnFhnZl6avi9UtpBlwk3vsDklb_m3WB6D4WSp8bSssU_AFWkj-OpU7LDDd6Ak2H40eOkjS2RJl_FJCAgpMHOT1sY2PVxNtchnWXOFlEilQVM78NP_41oTj9j-KWwIOw-hTUEhBcqtX007c6hthrEnOk6gs85izozrRzdJzxek01YOPOuauxFV8LvCpA3rXz8KMhTKfx-0tGAA8_dgB-h6Bc45wt3CV7dz8V7mDZbuORX_dc7BEv8SliJ-8xxT8gV9fj2kopk3vPyQ",
      course: "Thiết kế UI/UX",
      courseCode: "K08 - 2023",
      progress: 100,
      status: "completed",
    },
    {
      key: "3",
      id: "3",
      name: "Lê Văn Cường",
      email: "cuong.le@example.com",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuA24T_Hqpbn1Xciv1_kKqdQYcXEcKOE9mq6TmjvC8xzKf7O5hWSBRHDvklqe61z200u1KJtIFQCOPwBhn9ytkytHXc0IOd8RXq3bNMT9WBnHSrsw-tF62KdJgolESt2sL-f-jA_KSAT4YwijnTSAuIr-yBiDoTBxR_gyNES2ZBCsK4LWO78HMX3fxjDlF0ILifKYjXKvyMgnKX7gXBJx3Tpgx_23t7VR-ReuZ7nTqWSefHySSO2XHoMfP_vvNvp-FXzhNsQz0gFTF8",
      course: "Python Cơ Bản",
      courseCode: "K15 - 2024",
      progress: 0,
      status: "pending",
    },
    {
      key: "4",
      id: "4",
      name: "Phạm Thị Dung",
      email: "dung.pham@example.com",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDsLuoqZ36jxqm1f9TjwACSxPEx11Bj0_2v21H0oPmyaO6jaC6iXCmVavxpK6jLSJFHrYiIk10C8-9UupiS5as6_hsrVfFq26-p41_tqiNHxPo78GqVR4XyuthTZleRlRiJU-9tLg3m7FF_yANObtFGKPf7WsT7o2YWJcQk6jmjNUNAeTE2sGaaycSSmwYDFfhVfbsABNH6k0KaqcXWVBt_gAdncuDzse_Jq_TuCqPEM_F7xA88W181AjU0Y-Dy7dBoOc0mblQmaYk",
      course: "Lập trình ReactJS",
      courseCode: "K14 - 2023",
      progress: 45,
      status: "active",
    },
  ]);

  const handleApprove = (studentId) => {
    Modal.confirm({
      title: "Duyệt học viên",
      content: "Bạn có chắc chắn muốn duyệt học viên này?",
      okText: "Duyệt",
      cancelText: "Hủy",
      okButtonProps: { type: "primary" },
      onOk() {
        setStudents((prev) =>
          prev.map((s) =>
            s.id === studentId ? { ...s, status: "active" } : s
          )
        );
      },
    });
  };

  const handleReject = (studentId) => {
    Modal.confirm({
      title: "Từ chối học viên",
      content: "Bạn có chắc chắn muốn từ chối học viên này?",
      okText: "Từ chối",
      cancelText: "Hủy",
      okButtonProps: { type: "primary", danger: true },
      onOk() {
        setStudents((prev) => prev.filter((s) => s.id !== studentId));
      },
    });
  };

  const handleDelete = (studentId) => {
    Modal.confirm({
      title: "Xóa học viên",
      content: "Bạn có chắc chắn muốn xóa học viên khỏi khóa học?",
      okText: "Xóa",
      cancelText: "Hủy",
      okButtonProps: { type: "primary", danger: true },
      onOk() {
        setStudents((prev) => prev.filter((s) => s.id !== studentId));
      },
    });
  };

  const getStatusTag = (status) => {
    const statusConfig = {
      active: {
        color: "blue",
        text: "Đang học",
      },
      completed: {
        color: "green",
        text: "Hoàn thành",
      },
      pending: {
        color: "orange",
        text: "Chờ duyệt",
      },
    };

    const config = statusConfig[status] || statusConfig.active;
    return (
      <Tag
        color={config.color}
        style={{ borderRadius: "20px" }}
      >
        {config.text}
      </Tag>
    );
  };

  const getProgressColor = (progress) => {
    if (progress === 100) return "#22c55e";
    if (progress >= 50) return "#137fec";
    return "#9ca3af";
  };

  const columns = [
    {
      title: "Học viên",
      dataIndex: "name",
      key: "name",
      width: 280,
      render: (text, record) => (
        <div className="flex items-center gap-3">
          <Avatar
            src={record.avatar}
            size={40}
            style={{ flexShrink: 0 }}
          />
          <div className="flex flex-col min-w-0">
            <p className="font-bold text-sm truncate text-[#111418] dark:text-white">
              {text}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {record.email}
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Khóa học",
      dataIndex: "course",
      key: "course",
      width: 200,
      render: (text, record) => (
        <div className="flex flex-col">
          <p className="text-sm font-medium text-[#111418] dark:text-white">
            {text}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {record.courseCode}
          </p>
        </div>
      ),
    },
    {
      title: "Tiến độ",
      dataIndex: "progress",
      key: "progress",
      width: 150,
      render: (progress) => (
        <div className="flex items-center gap-2">
          <div className="h-2 w-24 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden flex-shrink-0">
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${progress}%`,
                backgroundColor: getProgressColor(progress),
              }}
            ></div>
          </div>
          <span className="text-xs font-medium text-[#111418] dark:text-white min-w-fit">
            {progress}%
          </span>
        </div>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 140,
      render: (status) => getStatusTag(status),
    },
    {
      title: "Hành động",
      key: "action",
      width: 200,
      align: "right",
      render: (_, record) => {
        if (record.status === "pending") {
          return (
            <Space>
              <Button
                type="primary"
                size="small"
                icon={<CheckOutlined />}
                onClick={() => handleApprove(record.id)}
                style={{ borderRadius: "6px" }}
              >
                Duyệt
              </Button>
              <Button
                danger
                size="small"
                icon={<CloseOutlined />}
                onClick={() => handleReject(record.id)}
                style={{
                  borderRadius: "6px",
                  backgroundColor: "#ff4d4f",
                  borderColor: "#ff4d4f",
                  color: "white",
                }}
              >Từ chối</Button>
            </Space>
          );
        }

        return (
          <Space>
            <Button
              type="text"
              size="large"
              icon={<EyeOutlined />}
              title="Xem chi tiết"
              style={{ borderRadius: "6px" }}
            />
            <Button
              type="text"
              size="large"
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record.id)}
              title="Xóa khỏi khóa học"
              style={{ borderRadius: "6px" }}
            />
          </Space>
        );
      },
    },
  ];

  const filteredStudents = students.filter((student) => {
    const matchSearch =
      student.name.toLowerCase().includes(searchText.toLowerCase()) ||
      student.email.toLowerCase().includes(searchText.toLowerCase());
    const matchCourse = !courseFilter || student.course === courseFilter;
    const matchStatus = !statusFilter || student.status === statusFilter;

    return matchSearch && matchCourse && matchStatus;
  });

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-display">
      {/* Teacher Header */}
      <TeacherHeader />

      <div className="flex">
        {/* Sidebar */}
        <TeacherSidebar />

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 pt-16">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <h1 className="text-2xl md:text-3xl text-[#111418] dark:text-white font-bold leading-tight">
                Quản lý Học viên
              </h1>
              <Button
                type="primary"
                size="large"
                icon={<span style={{ marginRight: "8px" }}>+</span>}
              >
                Thêm học viên
              </Button>
            </div>

            {/* Filters */}
            <div className="mb-6">
              <div className="flex flex-col md:flex-row gap-2 items-end">
                <Input
                  placeholder="Tìm kiếm theo tên hoặc email..."
                  prefix={<SearchOutlined />}
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  style={{ flex: 2 }}
                  className="h-10"
                />
                <Select
                  placeholder="Tất cả khóa học"
                  value={courseFilter || undefined}
                  onChange={setCourseFilter}
                  style={{ flex: 1 }}
                  className="h-10"
                  options={[
                    { label: "Tất cả khóa học", value: "" },
                    { label: "Lập trình ReactJS", value: "Lập trình ReactJS" },
                    { label: "Python Cơ Bản", value: "Python Cơ Bản" },
                    { label: "Thiết kế UI/UX", value: "Thiết kế UI/UX" },
                  ]}
                />
                <Select
                  placeholder="Trạng thái"
                  value={statusFilter || undefined}
                  onChange={setStatusFilter}
                  style={{ flex: 1 }}
                  className="h-10"
                  options={[
                    { label: "Trạng thái", value: "" },
                    { label: "Đang học", value: "active" },
                    { label: "Hoàn thành", value: "completed" },
                    { label: "Chờ duyệt", value: "pending" },
                  ]}
                />
              </div>
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-[#1a2632] rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <Table
                columns={columns}
                dataSource={filteredStudents}
                pagination={{
                  pageSize: 10,
                  showTotal: (total, range) =>
                    `Hiển thị ${range[0]} đến ${range[1]} trong tổng số ${total} học viên`,
                  position: ["bottomCenter"],
                }}
                rowSelection={{
                  selectedRowKeys: selectedRows,
                  onChange: (keys) => setSelectedRows(keys),
                }}
                scroll={{ x: 1200 }}
                className="dark:bg-[#1a2632]"
                style={{
                  borderColor: "transparent",
                }}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
