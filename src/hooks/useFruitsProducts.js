// src/hooks/useFruitsProducts.js

import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://raffat.daimooma.com/fruitsProducts";

const useFruitsProducts = () => {
  const [fruitsProducts, setFruitsProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all fruits products
  const fetchFruitsProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      setFruitsProducts(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Create a new fruit product
  const createFruitProduct = async (newProduct) => {
    setLoading(true);
    try {
      const response = await axios.post(API_URL, newProduct);
      setFruitsProducts([...fruitsProducts, response.data]);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Update an existing fruit product
  const updateFruitProduct = async (id, updatedProduct) => {
    setLoading(true);
    try {
      const response = await axios.put(`${API_URL}/${id}`, updatedProduct);
      setFruitsProducts(
        fruitsProducts.map((product) =>
          product.id === id ? response.data : product
        )
      );
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Delete a fruit product
  const deleteFruitProduct = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${API_URL}/${id}`);
      setFruitsProducts(fruitsProducts.filter((product) => product.id !== id));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFruitsProducts();
  }, []);

  return {
    fruitsProducts,
    loading,
    error,
    fetchFruitsProducts,
    createFruitProduct,
    updateFruitProduct,
    deleteFruitProduct,
  };
};

export default useFruitsProducts;
