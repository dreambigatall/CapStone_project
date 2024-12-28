import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

function AddCabin() {
  return (
    <div>
      <Modal>{/*this is the parent componet wich encapuslet the Modal.Open and Modal.Window comonet*/}
        <Modal.Open opens="cabin-form">{/**this a button to open the modal . the props "open"is used to diferntiate wich Modal open*/}
          <Button>Add new Truck</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">{/*this a window or a componet we wnt to open in the modal format. the props "name"is used to diferntiate the Modal.Open to show the specific modal we want other ways we dont use the name it difficultwich is open onclick the button */}
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}
export default AddCabin;