import { useState } from "react";
import { toast } from "@repo/ui";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@repo/ui/accordion";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Input } from "@repo/ui/input";
import { updateSession } from "@/api/session";
import { useGetSession } from "@/api/queries";
import { useQueryClient } from "@tanstack/react-query";

const SessionBlock = () => {
  const { data } = useGetSession();
  const queryClient = useQueryClient();
  const [sessionToken, setSessionToken] = useState(data?.value ?? "");

  async function handleUpdate() {
    const { success } = await updateSession(sessionToken);
    if (success) {
      toast("SessionId", { description: "SessionId is updated" });
      queryClient.invalidateQueries({ queryKey: ["session"] });
    } else {
      toast("SessionId", { description: "Update failed" });
    }
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSessionToken(e.target.value);
  };

  return (
    <div>
      <Card className=" px-4 py-2">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger value="item-1">
              <span
                className={`${
                  sessionToken ? "text-green-500" : "text-red-500 "
                }`}
              >
                SESSION_ID
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex gap-4 m-4">
                <Input value={sessionToken ?? ""} onChange={onChange} />
                <Button type="button" onClick={handleUpdate}>
                  Update
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>
    </div>
  );
};

export default SessionBlock;
