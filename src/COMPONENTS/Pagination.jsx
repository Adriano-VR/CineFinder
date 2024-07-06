import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
// eslint-disable-next-line react/prop-types
export default function PaginationRounded({ count, page, onPageChange }) {

  // Função para lidar com a mudança de página
  const handlePageChange = (event, newPage) => {
    onPageChange(newPage);

  };

  return (
    <div className='flex items-center w-full justify-center p-5'>
    <Stack spacing={1} 
    sx={{
      '.MuiPaginationItem-root': {
        color: 'orange', // Altera a cor dos itens
          fontSize: "1rem",
      },
      '.MuiPaginationItem-ellipsis': {
        
        color: 'orange', // Altera a cor dos itens de reticências
      },
      '.MuiPaginationItem-page': {
        backgroundColor: 'transparent', // Altera a cor de fundo dos itens
      
      },
      '.MuiPaginationItem-page.Mui-selected': {
        backgroundColor: 'transparent', // Altera a cor de fundo do item selecionado
        color: 'white', // Altera a cor do texto do item selecionado
        border:"2px solid orange",
        background: "transparent",
      }
    }}
    > 
      <Pagination
        count={count}
        page={page}
        color="secondary"
        variant="outlined"
        shape="rounded"
        onChange={handlePageChange} // Certifique-se de que handlePageChange é passado aqui
      />
    </Stack>
    </div>
  );
}
