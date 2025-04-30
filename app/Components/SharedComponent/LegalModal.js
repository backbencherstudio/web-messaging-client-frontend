import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { legalContent } from "@/app/data/legalContent";

export const LegalModal = ({ isOpen, onClose, type }) => {
  const content = legalContent[type];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {content.title}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 overflow-y-auto custom-scrollbar max-h-[60vh] pr-4">
          {content.sections.map((section, index) => (
            <section key={index}>
              <h3 className="text-lg font-semibold mb-2">
                {section.heading}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {section.content}
              </p>
            </section>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};