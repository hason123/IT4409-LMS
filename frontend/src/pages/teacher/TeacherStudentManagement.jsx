import React, { useState, useEffect } from "react";
import TeacherHeader from "../../components/layout/TeacherHeader";
import TeacherSidebar from "../../components/layout/TeacherSidebar";
import { Table, Input, Select, Button, Space, Tag, Modal, Breadcrumb, Spin, message } from "antd";
import CustomAvatar from "../../components/common/Avatar";
import {
  SearchOutlined,
  EyeOutlined,
  MessageOutlined,
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { getTeacherEnrollments, approveEnrollment, rejectEnrollment, deleteEnrollment } from "../../api/course";

export default function TeacherStudentManagement() {
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [courseFilter, setCourseFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [enrollments, setEnrollments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [displayLoading, setDisplayLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Debounce loading state to avoid spinner flash for quick loads
  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setDisplayLoading(true);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setDisplayLoading(false);
    }
  }, [loading]);

  // Fetch enrollments with filters
  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await getTeacherEnrollments(currentPage, pageSize, courseFilter || null, statusFilter || null);
        const enrollmentList = (res.data.pageList).map((enrollment, index) => ({
          key: enrollment.id || index,
          id: enrollment.id,
          studentId: enrollment.studentId,
          name: enrollment.fullName || "N/A",
          username: enrollment.userName || "N/A",
          email: enrollment.userName || "N/A",
          avatar: enrollment.studentAvatar || "",
          course: enrollment.courseTitle || "N/A",
          courseId: enrollment.courseId || "",
          courseCode: enrollment.courseCode || "",
          progress: enrollment.progress || 0,
          approvalStatus: enrollment.approvalStatus || "PENDING",
          enrollmentDate: enrollment.createdAt || new Date().toISOString(),
        }));
        setEnrollments(enrollmentList);
        
        // Extract unique courses for the filter
        const uniqueCourses = [...new Map(
          enrollmentList.map(e => [e.courseId, { id: e.courseId, name: e.course }])
        ).values()];
        setCourses(uniqueCourses.filter(c => c.id));
      } catch (err) {
        console.log("Failed to fetch enrollments:", err);
        setError(err.message);
        message.error("Không thể tải dữ liệu học viên");
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollments();
  }, [courseFilter, statusFilter, currentPage]);

  const handleApprove = (enrollmentId, studentId, courseId) => {
    Modal.confirm({
      title: "Duyệt đơn đăng ký",
      content: "Bạn có chắc chắn muốn duyệt học viên này?",
      okText: "Duyệt",
      cancelText: "Hủy",
      okButtonProps: { type: "primary" },
      async onOk() {
        try {
          await approveEnrollment(studentId, courseId);
          setEnrollments((prev) =>
            prev.map((e) =>
              e.id === enrollmentId ? { ...e, approvalStatus: "APPROVED" } : e
            )
          );
          message.success("Duyệt học viên thành công!");
        } catch (err) {
          message.error(err.message || "Lỗi khi duyệt học viên");
        }
      },
    });
  };

  const handleReject = (enrollmentId, studentId, courseId) => {
    Modal.confirm({
      title: "Từ chối đơn đăng ký",
      content: "Bạn có chắc chắn muốn từ chối học viên này?",
      okText: "Từ chối",
      cancelText: "Hủy",
      okButtonProps: { type: "primary", danger: true },
      async onOk() {
        try {
          await rejectEnrollment(studentId, courseId);
          setEnrollments((prev) =>
            prev.map((e) =>
              e.id === enrollmentId ? { ...e, approvalStatus: "REJECTED" } : e
            )
          );
          message.success("Từ chối học viên thành công!");
        } catch (err) {
          message.error(err.message || "Lỗi khi từ chối học viên");
        }
      },
    });
  };

  const handleDelete = (enrollmentId) => {
    Modal.confirm({
      title: "Xóa học viên",
      content: "Bạn có chắc chắn muốn xóa học viên khỏi khóa học?",
      okText: "Xóa",
      cancelText: "Hủy",
      okButtonProps: { type: "primary", danger: true },
      async onOk() {
        try {
          await deleteEnrollment(enrollmentId);
          setEnrollments((prev) => prev.filter((e) => e.id !== enrollmentId));
          message.success("Xóa học viên thành công!");
        } catch (err) {
          message.error(err.message || "Lỗi khi xóa học viên");
        }
      },
    });
  };

  const getStatusTag = (approvalStatus) => {
    const statusConfig = {
      APPROVED: {
        color: "green",
        text: "Đã duyệt",
      },
      PENDING: {
        color: "orange",
        text: "Chờ duyệt",
      },
      REJECTED: {
        color: "red",
        text: "Bị từ chối",
      },
    };

    const config = statusConfig[approvalStatus] || statusConfig.PENDING;
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
          <CustomAvatar
            src={record.avatar}
            alt={record.name}
            className="w-10 h-10"
          />
          <div className="flex flex-col min-w-0">
            <p className="font-bold text-sm truncate text-[#111418] dark:text-white">
              {text}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {record.username}
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
          <p className="text-md font-bold text-[#111418] dark:text-white">
            {text}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            #{record.courseCode}
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
      title: "Trạng thái duyệt",
      dataIndex: "approvalStatus",
      key: "approvalStatus",
      width: 140,
      render: (approvalStatus) => getStatusTag(approvalStatus),
    },
    {
      title: "Ngày đăng ký",
      dataIndex: "enrollmentDate",
      key: "enrollmentDate",
      width: 150,
      render: (date) => {
        const d = new Date(date);
        return d.toLocaleDateString("vi-VN");
      },
    },
    {
      title: "Hành động",
      key: "action",
      width: 200,
      align: "right",
      render: (_, record) => {
        if (record.approvalStatus === "PENDING") {
          return (
            <Space>
              <Button
                type="primary"
                size="small"
                icon={<CheckOutlined />}
                onClick={() => handleApprove(record.id, record.studentId, record.courseId)}
                style={{ borderRadius: "6px" }}
              >
                Duyệt
              </Button>
              <Button
                danger
                size="small"
                icon={<CloseOutlined />}
                onClick={() => handleReject(record.id, record.studentId, record.courseId)}
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

  const filteredEnrollments = enrollments.filter((enrollment) => {
    const matchSearch =
      enrollment.name.toLowerCase().includes(searchText.toLowerCase()) ||
      enrollment.username.toLowerCase().includes(searchText.toLowerCase());

    return matchSearch;
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
                  placeholder="Tìm kiếm theo tên sinh viên..."
                  prefix={<SearchOutlined />}
                  value={searchText}    
                  onChange={(e) => setSearchText(e.target.value)}
                  style={{ flex: 2 }}
                  className="h-10"
                />
                <Select
                  placeholder="Tất cả khóa học"
                  value={courseFilter || undefined}
                  onChange={(val) => {
                    setCourseFilter(val);
                    setCurrentPage(1);
                  }}
                  style={{ flex: 1 }}
                  className="h-10"
                  options={[
                    { label: "Tất cả khóa học", value: "" },
                    ...courses.map(c => ({ label: c.name, value: c.id })),
                  ]}
                />
                <Select
                  placeholder="Trạng thái duyệt"
                  value={statusFilter || undefined}
                  onChange={(val) => {
                    setStatusFilter(val);
                    setCurrentPage(1);
                  }}
                  style={{ flex: 1 }}
                  className="h-10"
                  options={[
                    { label: "Tất cả trạng thái", value: "" },
                    { label: "Chờ duyệt", value: "PENDING" },
                    { label: "Đã duyệt", value: "APPROVED" },
                    { label: "Bị từ chối", value: "REJECTED" },
                  ]}
                />
              </div>
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-[#1a2632] rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <Spin spinning={displayLoading} tip="Đang tải...">
                <Table
                  columns={columns}
                  dataSource={filteredEnrollments}
                  pagination={{
                    current: currentPage,
                    pageSize: pageSize,
                    onChange: (page) => setCurrentPage(page),
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
              </Spin>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
