import { useLocation } from "react-router-dom";
import GeneratePagoModal from "./GeneratePagoModal";

export default function RegistrarPago() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const cuotaID = queryParams.get("cuota");

  const viewModal = queryParams.get("generatePago");
  const showModal = viewModal ? true : false;

  return <GeneratePagoModal showModal={showModal} cuotaID={cuotaID!} />;
}
