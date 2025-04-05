import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import Header from "@/components/shared/header/Header";
import { IconButton, Divider } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PaidIcon from "@mui/icons-material/Paid";
import { Invoice } from "@/interfaces/Invoice";
import { useEffect, useState } from "react";
import "./Invoices.scss";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Box,
} from "@mui/material";


const Invoices = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  useEffect(() => {
    const data = localStorage.getItem("invoices");
    setInvoices(data ? JSON.parse(data) : []);
  }, []);

  return (
    <>
      <Header />
      <section className="admin-invoices">
        <h2 className="admin-invoices__title">Facturas Generadas</h2>

        {invoices.length === 0 ? (
          <p>No hay facturas registradas.</p>
        ) : (
          <Grid container spacing={2}>
            {invoices.map((invoice) => (
              <Grid item xs={12} md={6} lg={4} key={invoice.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Cliente: {invoice.customer.name}
                    </Typography>
                    <Typography variant="body2">
                      Email: {invoice.customer.email}
                    </Typography>
                    <Typography variant="body2">
                      País: {invoice.customer.country}
                    </Typography>
                    <Typography variant="body2">
                      Fecha: {new Date(invoice.date).toLocaleString()}
                    </Typography>
                    <Typography variant="body1" fontWeight={600}>
                      Total: {invoice.total.toLocaleString("es-CO")} COP
                    </Typography>
                    <Button
                      variant="outlined"
                      color="primary"
                      sx={{ mt: 1 }}
                      onClick={() => setSelectedInvoice(invoice)}
                    >
                      Ver detalle
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </section>
      <Dialog
        open={!!selectedInvoice}
        onClose={() => setSelectedInvoice(null)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <ReceiptLongIcon color="primary" />
            <span>Detalle de Factura</span>
          </div>
          <IconButton onClick={() => setSelectedInvoice(null)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent
          dividers
          sx={{
            bgcolor: "#fafafa",
            maxHeight: "500px",
            overflowY: "auto",
          }}
        >
          {selectedInvoice && (
            <>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Cliente:</strong> {selectedInvoice.customer.name}
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>Email:</strong> {selectedInvoice.customer.email}
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>País:</strong> {selectedInvoice.customer.country}
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>Fecha:</strong> {new Date(selectedInvoice.date).toLocaleString()}
              </Typography>

              <Divider sx={{ my: 2 }} />
              <Box sx={{ overflowX: "auto" }}>
                <Table size="small" stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell>Producto</TableCell>
                      <TableCell align="center">Cantidad</TableCell>
                      <TableCell align="right">Precio</TableCell>
                      <TableCell align="right">Subtotal</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedInvoice.items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell align="center">{item.quantity}</TableCell>
                        <TableCell align="right">
                          {item.price.toLocaleString("es-CO")}
                        </TableCell>
                        <TableCell align="right">
                          {(item.quantity * item.price).toLocaleString("es-CO")}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Typography
                variant="h6"
                align="right"
                color="success.main"
                sx={{ mt: 2 }}
              >
                <PaidIcon fontSize="small" sx={{ mr: 1 }} />
                Total: {selectedInvoice.total.toLocaleString("es-CO")} COP
              </Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedInvoice(null)} color="primary" variant="contained">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>

    </>
  );
};

export default Invoices;
