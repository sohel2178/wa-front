"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Badge } from "@/components/ui/badge";

import { Separator } from "@/components/ui/separator";

import { MetaTemplate } from "@/types/meta-template";

import TemplateStatusBadge from "./TemplateStatusBadge";

interface Props {
  open: boolean;

  template: MetaTemplate | null;

  onOpenChange: (open: boolean) => void;
}

export default function TemplateDetailsDialog({
  open,
  template,
  onOpenChange,
}: Props) {
  if (!template) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{template.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground">Language</p>

              <p className="font-medium">{template.language}</p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground">Category</p>

              <Badge variant="secondary">{template.category}</Badge>
            </div>

            <div>
              <p className="text-xs text-muted-foreground">Status</p>

              <TemplateStatusBadge status={template.status} />
            </div>

            <div>
              <p className="text-xs text-muted-foreground">Quality</p>

              <p className="font-medium">{template.qualityScore ?? "-"}</p>
            </div>
          </div>

          <Separator />

          {template.header && (
            <div>
              <h3 className="mb-2 font-semibold">Header</h3>

              <div className="rounded-md border bg-muted/30 p-4 whitespace-pre-wrap">
                {template.header.text || "(Media Header)"}
              </div>
            </div>
          )}

          {template.body && (
            <div>
              <h3 className="mb-2 font-semibold">Body</h3>

              <div className="rounded-md border bg-muted/30 p-4 whitespace-pre-wrap">
                {template.body.text}
              </div>
            </div>
          )}

          {template.footer && (
            <div>
              <h3 className="mb-2 font-semibold">Footer</h3>

              <div className="rounded-md border bg-muted/30 p-4 whitespace-pre-wrap">
                {template.footer.text}
              </div>
            </div>
          )}

          {template.buttons.length > 0 && (
            <div>
              <h3 className="mb-3 font-semibold">Buttons</h3>

              <div className="flex flex-wrap gap-2">
                {template.buttons.map((button, index) => (
                  <Badge key={index} variant="outline">
                    {button.text}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {template.rejectedReason && (
            <>
              <Separator />

              <div>
                <h3 className="mb-2 font-semibold text-red-600">
                  Rejected Reason
                </h3>

                <p className="text-sm">{template.rejectedReason}</p>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
