"use client";

import {
  type ForwardedRef,
  forwardRef,
  type ReactNode,
  useImperativeHandle,
} from "react";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/react";

import type { DialogRef } from "./types/dialog-ref";
import { useDialog } from "./use-dialog";
import { Slot } from "@radix-ui/react-slot";

type DialogProps = {
  title: string;
  children: (closeDialog: VoidFunction) => ReactNode;
  trigger?: ReactNode;
  size?:
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "full";
  isDismissable?: boolean;
  hideCloseButton?: boolean;
  onOpen?: () => void;
};

const DialogComponent = (
  {
    title,
    children,
    trigger,
    size,
    isDismissable,
    hideCloseButton,
    onOpen: onOpenDialog,
  }: DialogProps,
  ref: ForwardedRef<DialogRef>,
) => {
  const { isOpen, open, close } = useDialog(onOpenDialog);

  useImperativeHandle(
    ref,
    () => {
      return {
        close,
        open,
      };
    },
    [open, close],
  );

  return (
    <>
      <Modal
        size={size ? size : "md"}
        isDismissable={isDismissable ?? true}
        hideCloseButton={hideCloseButton ?? false}
        isOpen={isOpen}
        scrollBehavior="inside"
        classNames={{ wrapper: "overflow-x-hidden" }}
        onClose={close}
      >
        <ModalContent className="z-50 ">
          <ModalHeader>{title}</ModalHeader>
          <ModalBody>{children(close)}</ModalBody>
        </ModalContent>
      </Modal>
      {trigger && <Slot onClick={open}>{trigger}</Slot>}
    </>
  );
};

export const Dialog = forwardRef(DialogComponent);
