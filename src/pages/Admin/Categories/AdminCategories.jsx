import { useEffect, useState } from "react";
import {
  fetchAdminCategories,
  createAdminCategory,
  deleteAdminCategory,
} from "../../../services/adminService";

import "./AdminCategories.css";

function AdminCategories() {
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [categoryName, setCategoryName] = useState("");

  const [categoryLoading, setCategoryLoading] = useState(false);

  const [categoryError, setCategoryError] = useState("");

  const [deletingCategoryId, setDeletingCategoryId] = useState(null);

  const [deleteError, setDeleteError] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await fetchAdminCategories();

      setCategories(data || []);
    } catch (error) {
      setError(
        error.message || "Failed to load categories"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = async (event) => {
    event.preventDefault();

    try {
      setCategoryLoading(true);
      setCategoryError("");

      const name = categoryName.trim();

      if (!name) {
        setCategoryError("Category name is required");
        return;
      }

      const slug = name
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-");

      const createdCategory =
        await createAdminCategory({
          name,
          slug,
        });

      setCategories((previousCategories) => [
        ...previousCategories,
        createdCategory,
      ]);

      setCategoryName("");
      setShowForm(false);
    } catch (error) {
      setCategoryError(
        error.message || "Failed to create category"
      );
    } finally {
      setCategoryLoading(false);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingCategoryId(categoryId);
      setDeleteError("");

      await deleteAdminCategory(categoryId);

      setCategories((previousCategories) =>
        previousCategories.filter(
          (category) => category.id !== categoryId
        )
      );
    } catch (error) {
      setDeleteError(
        error.message || "Failed to delete category"
      );
    } finally {
      setDeletingCategoryId(null);
    }
  };

  if (loading) {
    return (
      <div className="admin-categories-state">
        Loading categories...
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-categories-state error">
        {error}

        <button
          type="button"
          onClick={loadCategories}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="admin-categories">

      {/* Header */}

      <div className="admin-categories-header">
        <div>
          <h2>Categories</h2>

          <p>
            Manage product categories for your store.
          </p>
        </div>

        <button
          type="button"
          className="admin-category-add-btn"
          onClick={() => {
            setShowForm((previous) => !previous);
            setCategoryError("");
          }}
        >
          + Add Category
        </button>
      </div>

      {/* Add Category Form */}

      {showForm && (
        <form
          className="admin-category-form"
          onSubmit={handleAddCategory}
        >
          <div className="admin-category-form-header">
            <div>
              <strong>
                Add New Category
              </strong>

              <span>
                Create a category for your products.
              </span>
            </div>

            <button
              type="button"
              className="admin-category-close-btn"
              onClick={() => {
                setShowForm(false);
                setCategoryError("");
                setCategoryName("");
              }}
            >
              ×
            </button>
          </div>

          {categoryError && (
            <div className="admin-category-form-error">
              {categoryError}
            </div>
          )}

          <div className="admin-category-form-field">
            <label htmlFor="category-name">
              Category Name
            </label>

            <input
              id="category-name"
              type="text"
              placeholder="e.g. Pickles"
              value={categoryName}
              onChange={(event) =>
                setCategoryName(event.target.value)
              }
              required
            />
          </div>

          <div className="admin-category-form-actions">
            <button
              type="button"
              className="admin-category-cancel-btn"
              onClick={() => {
                setShowForm(false);
                setCategoryError("");
                setCategoryName("");
              }}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="admin-category-save-btn"
              disabled={categoryLoading}
            >
              {categoryLoading
                ? "Creating..."
                : "Create Category"}
            </button>
          </div>
        </form>
      )}

      {deleteError && (
        <div className="admin-category-delete-error">
          {deleteError}
        </div>
      )}

      {/* Category Table */}

      <div className="admin-categories-card">

        <div className="admin-categories-summary">
          <strong>
            {categories.length}
          </strong>

          <span>
            {categories.length === 1
              ? "Category"
              : "Categories"}
          </span>
        </div>

        {categories.length === 0 ? (
          <div className="admin-categories-empty">
            <h3>No categories found</h3>

            <p>
              Create your first product category.
            </p>
          </div>
        ) : (
          <div className="admin-categories-table-wrapper">
            <table className="admin-categories-table">

              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Slug</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {categories.map((category) => (
                  <tr key={category.id}>

                    <td>
                      #{category.id}
                    </td>

                    <td>
                      <strong>
                        {category.name}
                      </strong>
                    </td>

                    <td>
                      <span className="admin-category-slug">
                        {category.slug}
                      </span>
                    </td>

                    <td>
                      <button
                        type="button"
                        className="admin-category-delete-btn"
                        onClick={() =>
                          handleDeleteCategory(
                            category.id
                          )
                        }
                        disabled={
                          deletingCategoryId ===
                          category.id
                        }
                      >
                        {deletingCategoryId ===
                        category.id
                          ? "Deleting..."
                          : "Delete"}
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}

      </div>

    </div>
  );
}

export default AdminCategories;