import { filterOptions } from "@/config";
import { Checkbox } from "../ui/checkbox";
import { Label } from "@radix-ui/react-label";
import { Separator } from "../ui/separator";

export function ProductFilter({ filter, handleFilter }) {
  return (
    <div className="glass rounded-2xl overflow-hidden h-fit sticky top-24">
      <div className="p-6 border-b border-white/10 flex items-center justify-between">
        <h2 className="text-xl font-black text-white tracking-widest uppercase">Filters</h2>
        <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full uppercase">Refine</span>
      </div>
      <div className="p-6 space-y-8">
        {Object.keys(filterOptions).map((item) => (
          <div key={item} className="space-y-4">
            <h3 className="text-xs font-black text-white/40 uppercase tracking-[0.2em]">{item}</h3>
            <div className="grid gap-3">
              {filterOptions[item].map((option) => (
                <Label 
                  key={option.id} 
                  className="flex items-center gap-3 font-bold text-white/70 hover:text-primary transition-colors cursor-pointer group"
                >
                  <Checkbox 
                    checked={
                      filter && 
                      filter[item] && 
                      filter[item].indexOf(option.id) > -1
                    } 
                    onCheckedChange={() => handleFilter(item, option.id)} 
                    className="border-white/20 data-[state=checked]:bg-primary data-[state=checked]:text-black transition-all group-hover:border-primary/50"
                  />
                  <span className="text-sm transition-transform group-active:scale-95">{option.label}</span>
                </Label>
              ))}
            </div>
            <Separator className="bg-white/5 mt-6" />
          </div>
        ))}
      </div>
    </div>
  );
}
