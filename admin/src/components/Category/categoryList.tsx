import { Breadcrumbs, Button, Chip, Pagination } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FaHome, FaEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import { emphasize, styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { Category, categoryService } from '../../services/categoryList';

// Styled Breadcrumb
const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === 'light'
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});

const CategoryList: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const data = await categoryService.getAllCategories();
      console.log(data);
      setCategories(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      setError('Failed to fetch categories');
      console.error('Error fetching categories:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await categoryService.deleteCategory(id);
        await fetchCategories(); // Refresh the list after deletion
      } catch (err) {
        console.error('Failed to delete category:', err);
        setError('Failed to delete category');
      }
    }
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: '200px' }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger m-3" role="alert">
        {error}
        <button
          className="btn btn-outline-danger ms-3"
          onClick={fetchCategories}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="right-content w-100">
      <div className="card shadow bordoer-0 w-100 flex-row p-4">
        <h5 className="mb-0">Category List</h5>
        <div className="d-flex align-items-center ml-auto">
          <Breadcrumbs aria-label="breadcrumb" className="ml-auto breadcrumbs_">
            <StyledBreadcrumb
              label="Dashboard"
              icon={<FaHome fontSize="small" />}
            />
            <StyledBreadcrumb label="Categories" />
          </Breadcrumbs>
          <Link to="/category/upload">
            <Button className="btn-blue ml-3 pl-3 pr-3">Add Category</Button>
          </Link>
        </div>
      </div>

      <div className="card shadow border-0 p-3 mt-4">
        <div className="table-responsive mt-3">
          <table className="table table-bordered table-striped v-align">
            <thead className="thead-dark">
              <tr>
                <th>UID</th>
                <th style={{ width: '100px' }}>IMAGE</th>
                <th>CATEGORY</th>
                <th>DESCRIPTION</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {categories.length > 0 ? (
                categories.map((value, index) => (
                  <tr key={value.id}>
                    <td>#{index + 1}</td>
                    <td>
                      <div className="d-flex align-items-center productBox">
                        <div className="imgWrapper">
                          <div className="img card shadow m-0">
                            <img
                              src={value?.image}
                              alt={value.name}
                              className="w-100"
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{value.name}</td>
                    <td>{value.parentId ? 'Subcategory' : 'Main Category'}</td>
                    <td>
                      <div className="actions d-flex align-items-center">
                        <Link to={`/categories/edit/${value.id}`}>
                          <Button className="edit">
                            <FaEdit />
                          </Button>
                        </Link>
                        <Button
                          className="delete"
                          onClick={() => handleDelete(value.id)}
                        >
                          <MdDeleteForever />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center">
                    No categories found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {categories.length > 0 && (
            <div className="d-flex tableFooter">
              <Pagination
                count={Math.ceil(categories.length / 10)}
                color="primary"
                className="pagination"
                showFirstButton
                showLastButton
                onChange={handlePageChange}
                page={page}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
