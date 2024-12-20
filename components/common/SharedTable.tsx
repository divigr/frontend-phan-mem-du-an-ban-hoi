import React from 'react'
import styled from 'styled-components'

// Styled Components
const ResponsiveTableWrapper = styled.div`
  max-width: 100%;
  overflow-x: auto;

  @media (max-width: 990px) {
    overflow-y: auto;
    overflow-x: auto;
    max-height: 80vh;
    max-width: 80vw;
  }
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #ccc;
`

const Thead = styled.thead`
  background-color: #f5f5f5;
`

const Th = styled.th`
  border: 1px solid #ccc;
  padding: 8px;
  text-align: ${(props: { align?: string }) => props.align || 'left'};
`

const Td = styled.td<{ isNegative?: boolean }>`
  border: 1px solid #ccc;
  padding: 8px;
  text-align: center;
  color: ${(props) => (props.isNegative ? 'red' : 'inherit')};
`

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;

  .spinner {
    width: 24px;
    height: 24px;
    border: 4px solid #ccc;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

const LoadingSpinner: React.FC = () => (
  <LoadingWrapper>
    <div className='spinner'></div>
    <span style={{ marginLeft: '8px' }}>Đang tải dữ liệu...</span>
  </LoadingWrapper>
)

interface Column {
  key: string
  label: string
  children?: Column[]
}

interface RowType {
  ngay?: string // Optional
  ca?: string // Optional
  [key: string]: React.ReactNode
}

interface TableProps {
  columns: Column[]
  data: RowType[] // Use RowType here instead of the generic type
  loading?: boolean
  onEdit?: (item: RowType) => void
  onDelete?: (item: RowType) => void
  onAdd?: (item: RowType) => void
}

const renderHeaders = (columns: Column[], includeActions: boolean): React.ReactNode => {
  const hasChildren = columns.some((col) => col.children)

  return (
    <>
      <tr>
        {columns.map((column) => {
          const colKey = column.key

          if (column.children) {
            return (
              <Th key={colKey} align='center' colSpan={column.children.length}>
                {column.label}
              </Th>
            )
          }

          return (
            <Th key={colKey} align='left' rowSpan={hasChildren ? 2 : 1}>
              {column.label}
            </Th>
          )
        })}
        {includeActions && (
          <Th rowSpan={hasChildren ? 2 : 1} align='center'>
            Hành Động
          </Th>
        )}
      </tr>
      {hasChildren && (
        <tr>
          {columns
            .filter((column) => column.children)
            .flatMap((column) =>
              column.children?.map((child) => (
                <Th key={`${column.key}-${child.key}`} align='left'>
                  {child.label}
                </Th>
              ))
            )}
        </tr>
      )}
    </>
  )
}

const SharedTable: React.FC<TableProps> = ({ columns, data, loading = false, onEdit, onDelete, onAdd }) => {
  const includeActions = !!onEdit || !!onDelete || !!onAdd

  const renderData = (row: { [key: string]: React.ReactNode }) => {
    const childColumns = columns.flatMap((col) => (col.children ? col.children.map((child) => child.key) : col.key))

    return childColumns.map((key) => {
      const cellValue = row[key]

      // Format numbers with custom formatting
      const formattedValue =
        typeof cellValue === 'number'
          ? new Intl.NumberFormat('de-DE', {
              minimumFractionDigits: cellValue % 1 === 0 ? 0 : 2, // 0 decimals for integers, 2 decimals for floats
              maximumFractionDigits: 2, // Limit to 2 decimal places
            }).format(cellValue)
          : cellValue

      return (
        <Td key={key} isNegative={typeof cellValue === 'number' && cellValue < 0}>
          {formattedValue}
        </Td>
      )
    })
  }

  return (
    <ResponsiveTableWrapper>
      <Table>
        <Thead>{renderHeaders(columns, includeActions)}</Thead>
        <tbody>
          {loading ? (
            <tr>
              <Td colSpan={columns.length + (includeActions ? 1 : 0)}>
                <LoadingSpinner />
              </Td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <Td colSpan={columns.length + (includeActions ? 1 : 0)} style={{ textAlign: 'center' }}>
                Không có dữ liệu
              </Td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} style={{ backgroundColor: rowIndex % 2 === 0 ? '#fff' : '#f9f9f9' }}>
                {renderData(row)}
                {includeActions && (
                  <Td>
                    {onEdit && (
                      <button
                        onClick={() => onEdit(row)}
                        style={{
                          backgroundColor: '#3498db',
                          color: '#fff',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          marginRight: '4px',
                          cursor: 'pointer',
                          marginTop: '10px',
                        }}>
                        Sửa
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => onDelete(row)}
                        style={{
                          backgroundColor: '#e74c3c',
                          color: '#fff',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          marginTop: '10px',
                        }}>
                        Xóa
                      </button>
                    )}
                    {onAdd && (
                      <button
                        onClick={() => onAdd(row)}
                        style={{
                          backgroundColor: '#28a745',
                          color: '#fff',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          marginTop: '10px',
                        }}>
                        Thêm Thông Tin
                      </button>
                    )}
                  </Td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </ResponsiveTableWrapper>
  )
}

export default SharedTable
