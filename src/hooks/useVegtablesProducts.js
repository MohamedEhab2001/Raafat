// src/hooks/useVegtablesProducts.js

import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://raffat.daimooma.com/vegtabelsProducts";

const useVegtablesProducts = () => {
  const [vegtabelsProducts, setVegtablesProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all vegtables products
  const fetchVegtablesProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      setVegtablesProducts(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Create a new vegtable product
  const createVegtableProduct = async (newProduct) => {
    setLoading(true);
    try {
      const response = await axios.post(API_URL, newProduct);
      setVegtablesProducts([...vegtabelsProducts, response.data]);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Update an existing vegtable product
  const updateVegtableProduct = async (id, updatedProduct) => {
    setLoading(true);
    try {
      const response = await axios.put(`${API_URL}/${id}`, updatedProduct);
      setVegtablesProducts(
        vegtabelsProducts.map((product) =>
          product.id === id ? response.data : product
        )
      );
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Delete a vegtable product
  const deleteVegtableProduct = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${API_URL}/${id}`);
      setVegtablesProducts(
        vegtabelsProducts.filter((product) => product.id !== id)
      );
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVegtablesProducts();
  }, []);

  return {
    vegtabelsProducts,
    loading,
    error,
    fetchVegtablesProducts,
    createVegtableProduct,
    updateVegtableProduct,
    deleteVegtableProduct,
  };
};

export default useVegtablesProducts;
