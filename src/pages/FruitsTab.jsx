// src/pages/FruitsTab.js

import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, Space, Popconfirm } from "antd";
import useFruitsProducts from "../hooks/useFruitsProducts";
import { PlusOutlined } from "@ant-design/icons";

const FruitsTab = () => {
  const { fruitsProducts, loading, createFruitProduct, deleteFruitProduct } =
    useFruitsProducts();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const handleDeleteProduct = async (id) => {
    try {
      await deleteFruitProduct(id);
      window.location.reload();
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  const columns = [
    {
      title: "الاسم",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "الوصف",
      dataIndex: "desc",
      key: "desc",
    },
    {
      title: "الموسم",
      dataIndex: "season",
      key: "season",
    },
    {
      title: "الحجم",
      dataIndex: "size",
      key: "size",
    },
    {
      title: "الإجراءات",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            title="هل أنت متأكد أنك تريد حذف هذا المنتج؟"
            onConfirm={() => handleDeleteProduct(record.id)}
            okText="نعم"
            cancelText="لا"
          >
            <Button danger>حذف</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleAddProduct = async () => {
    try {
      const values = await form.validateFields();
      await createFruitProduct({
        ...values,
        id: Math.round(Math.random() * 100000000)+"",
        seasons: values.seasons.length ? values.seasons : null,
      });
      form.resetFields();
      setIsModalVisible(false);
    //   window.location.reload();
    } catch (error) {
      console.error("Failed to add product:", error);
    }
  };

  return (
    <>
      <Button
        type="primary"
        onClick={() => setIsModalVisible(true)}
        style={{ marginBottom: 16 }}
      >
        إضافة منتج
      </Button>
      <Table
        dataSource={fruitsProducts}
        columns={columns}
        loading={loading}
        rowKey="id"
      />
      <Modal
        title="إضافة منتج جديد"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleAddProduct}
        okText="إضافة"
        cancelText="إلغاء"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="الاسم"
            rules={[{ required: true, message: "يرجى إدخال اسم المنتج" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="iamg"
            label="لينك الصورة"
            rules={[{ required: true, message: "يرجى إدخال لينك صورة المنتج" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="desc"
            label="الوصف"
            // rules={[{ required: true, message: "يرجى إدخال وصف المنتج" }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="season"
            label="الموسم"
            // rules={[{ required: true, message: "يرجى إدخال الموسم" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="seasons" label="مواسم">
            <Form.List name="seasons" initialValue={[]}>
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, fieldKey, ...restField }) => (
                    <Space
                      key={key}
                      style={{ display: "flex", marginBottom: 8 }}
                      align="baseline"
                    >
                      <Form.Item
                        {...restField}
                        name={[name, "season"]}
                        fieldKey={[fieldKey, "season"]}
                        rules={[
                          { required: true, message: "يرجى إدخال الموسم" },
                        ]}
                      >
                        <Input placeholder="الموسم" />
                      </Form.Item>
                      <Button type="danger" onClick={() => remove(name)}>
                        حذف
                      </Button>
                    </Space>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      //   icon={<PlusOutlined />}
                    >
                      إضافة موسم
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Form.Item>
          <Form.Item
            name="size"
            label="الحجم"
            // rules={[{ required: true, message: "يرجى إدخال الحجم" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="weight"
            label="الوزن"
            // rules={[{ required: true, message: "يرجى إدخال الوزن" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="length"
            label="الطول"
            // rules={[{ required: true, message: "يرجى إدخال الطول" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="package"
            label="التغليف"
            // rules={[{ required: true, message: "يرجى إدخال الطول" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default FruitsTab;
