import React from 'react';
import { FolderTree, Search, Plus, RefreshCw, Smartphone, Info, Layers, Download } from 'lucide-react';
import { FileTree } from '../components/FileTree';
import { LanguageLogo } from '../components/LanguageLogo';

interface YonPanelProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  activeSidebarTab: "explorer" | "search" | "templates";
  setActiveSidebarTab: (tab: "explorer" | "search" | "templates") => void;
  loadingFiles: boolean;
  files: any[];
  openFile: (path: string) => void;
  handleDeleteTrigger: (path: string) => void;
  createFile: (parentDir: string, name: string, isFolder: boolean) => void;
  activeTabPath: string;
  triggerCreateModal: (parentDir: string, type: "file" | "folder") => void;
  fileSearchQuery: string;
  setFileSearchQuery: (query: string) => void;
  getFlattenedFiles: (files: any[]) => any[];
  user: any;
  setIsShareModalOpen: (open: boolean) => void;
  setIsProjectModalOpen: (open: boolean) => void;
  currentProject: string;
}

const YonPanel: React.FC<YonPanelProps> = ({
  sidebarOpen,
  setSidebarOpen,
  activeSidebarTab,
  setActiveSidebarTab,
  loadingFiles,
  files,
  openFile,
  handleDeleteTrigger,
  createFile,
  activeTabPath,
  triggerCreateModal,
  fileSearchQuery,
  setFileSearchQuery,
  getFlattenedFiles,
  user,
  setIsShareModalOpen,
  setIsProjectModalOpen,
  currentProject,
}) => {
  return (
    <aside className={`
      absolute md:static inset-y-0 left-0 z-40 bg-[#252526] border-r border-[#2d2d2d] flex flex-col shrink-0 transition-all duration-300
      ${sidebarOpen ? "w-64 translate-x-0 opacity-100" : "w-0 -translate-x-full opacity-0 pointer-events-none overflow-hidden border-none"}
    `}>
      <div className="p-2 border-b border-[#2d2d2d] bg-[#1e1e1e]/40 flex items-center justify-between select-none shrink-0 gap-2">
        <div className="flex items-center space-x-1 bg-slate-950/40 p-0.5 rounded-lg border border-white/5">
          <button
            onClick={() => setActiveSidebarTab("explorer")}
            className={`px-2 py-1 rounded text-[9px] font-extrabold uppercase tracking-wider transition ${
              activeSidebarTab === "explorer"
                ? "bg-slate-800 text-sky-400 font-black"
                : "text-slate-500 hover:text-slate-300"
            }`}
          >
            Files
          </button>
          <button
            onClick={() => setActiveSidebarTab("search")}
            className={`px-2 py-1 rounded text-[9px] font-extrabold uppercase tracking-wider transition ${
              activeSidebarTab === "search"
                ? "bg-slate-800 text-sky-400 font-black"
                : "text-slate-500 hover:text-slate-300"
            }`}
          >
            Search
          </button>
        </div>

        {activeSidebarTab === "explorer" ? (
          <div className="flex items-center space-x-1">
            <button
              onClick={() => triggerCreateModal("", "file")}
              className="p-1 hover:bg-[#2d2d2d] rounded text-slate-400 hover:text-sky-400 transition"
              title="Yangi fayl"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => triggerCreateModal("", "folder")}
              className="p-1 hover:bg-[#2d2d2d] rounded text-slate-400 hover:text-sky-400 transition"
              title="Yangi papka"
            >
              <FolderTree className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : null}
      </div>

      <div className="flex-1 flex flex-col overflow-hidden min-h-0">
        {activeSidebarTab === "explorer" ? (
          <div className="flex-1 overflow-y-auto p-1.5 custom-scrollbar min-h-0">
            {loadingFiles ? (
              <div className="flex flex-col items-center justify-center py-8 space-y-2">
                <RefreshCw className="w-6 h-6 text-sky-500 animate-spin" />
                <span className="text-xs text-slate-500">Yuklanmoqda...</span>
              </div>
            ) : (
              <FileTree
                files={files}
                onOpenFile={(path: string) => {
                  openFile(path);
                  if (window.innerWidth < 768) setSidebarOpen(false);
                }}
                onDeleteFile={handleDeleteTrigger}
                onCreateFile={createFile}
                activeFilePath={activeTabPath}
              />
            )}
          </div>
        ) : (
          <div className="flex-1 flex flex-col p-3 overflow-hidden space-y-3 bg-[#252526] min-h-0">
            <div className="relative shrink-0">
              <input
                type="text"
                value={fileSearchQuery}
                onChange={(e) => setFileSearchQuery(e.target.value)}
                placeholder="Fayllarni qidirish..."
                className="w-full pl-8 pr-7 py-1.5 bg-[#1e1e1e] border border-[#3c3c3c] rounded text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500 font-mono"
              />
              <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-slate-500" />
              {fileSearchQuery && (
                <button 
                  onClick={() => setFileSearchQuery("")}
                  className="absolute right-2.5 top-1.5 text-slate-400 hover:text-slate-200 text-sm font-bold"
                >
                  ×
                </button>
              )}
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar space-y-1 pr-1 min-h-0">
              <p className="text-[9px] text-slate-500 font-extrabold uppercase tracking-widest mb-2">
                {fileSearchQuery ? "MOS KELUVCHI FAYLLAR" : "LOYIHA FAYLLARI RO'YXATI"}
              </p>

              {(() => {
                const flat = getFlattenedFiles(files);
                const filtered = flat.filter((item: any) => 
                  !item.isFolder && 
                  (!fileSearchQuery || item.name.toLowerCase().includes(fileSearchQuery.toLowerCase()) || item.path.toLowerCase().includes(fileSearchQuery.toLowerCase()))
                );

                if (filtered.length === 0) {
                  return <p className="text-xs text-slate-500 italic p-2">Mos fayl topilmadi</p>;
                }

                return filtered.map((item: any) => (
                  <button
                    key={item.path}
                    onClick={() => {
                      openFile(item.path);
                      if (window.innerWidth < 768) setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center space-x-2 px-2 py-1.5 rounded text-left transition text-xs font-mono group ${
                      activeTabPath === item.path 
                        ? "bg-sky-950/30 text-sky-400 border-l border-sky-400" 
                        : "text-slate-400 hover:text-slate-200 hover:bg-[#2d2d2d]"
                    }`}
                  >
                    <LanguageLogo fileName={item.path} className="w-3.5 h-3.5 shrink-0" />
                    <div className="flex flex-col min-w-0">
                      <span className="truncate font-bold text-slate-300 group-hover:text-sky-400">{item.name}</span>
                      <span className="text-[9px] text-slate-500 truncate">{item.path}</span>
                    </div>
                  </button>
                ));
              })()}
            </div>
          </div>
        )}

        {user && user.email.startsWith("guest_") && (
          <div className="mx-2 mb-2 p-2.5 bg-cyan-950/40 border border-cyan-800/40 rounded-xl space-y-1.5 shrink-0 select-none">
            <div className="flex items-center space-x-1.5 text-cyan-400 font-bold text-[10px]">
              <Smartphone className="w-3.5 h-3.5 shrink-0 animate-pulse" />
              <span>Qurilmalarni ulash (Sync)</span>
            </div>
            <p className="text-[9px] text-slate-400 leading-normal">
              Boshqa telefonlarda loyiha fayllarini va ishingizni davom ettirish uchun <b>"Mobil Ulashish"</b> QR-kodidan foydalaning!
            </p>
            <button
              onClick={() => setIsShareModalOpen(true)}
              className="w-full py-1.5 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 font-extrabold text-[9px] rounded-lg border border-cyan-500/20 transition active:scale-95"
            >
              Sinxronizatsiya havolasi (QR)
            </button>
          </div>
        )}
      </div>

      <div className="p-3 bg-[#1e1e1e]/80 border-t border-[#2d2d2d] text-[10px] text-slate-400 space-y-2 shrink-0 select-none">
        <p className="flex items-center text-slate-400 font-semibold">
          <Info className="w-3.5 h-3.5 mr-1 text-sky-400 shrink-0" /> Ish stoli: <span className="font-mono bg-[#181818] px-1.5 py-0.5 rounded ml-1 border border-[#2d2d2d] text-slate-300">workspace/</span>
        </p>
        <div className="grid grid-cols-2 gap-1.5 mt-1">
          <button
            onClick={() => setIsProjectModalOpen(true)}
            className="flex items-center justify-center space-x-1 px-1.5 py-1.5 bg-[#181818] hover:bg-[#2d2d2d] border border-[#2d2d2d] hover:border-[#3c3c3c] text-slate-300 hover:text-sky-400 rounded text-[9px] font-extrabold transition active:scale-95"
            title="Loyiha andozasini o'zgartirish"
          >
            <Layers className="w-3 h-3 text-sky-400 shrink-0" />
            <span>LOYIHALAR</span>
          </button>
          <button
            onClick={() => window.open(`${window.location.origin}/api/workspace/project/export`, "_blank")}
            className="flex items-center justify-center space-x-1 px-1.5 py-1.5 bg-[#181818] hover:bg-[#2d2d2d] border border-[#2d2d2d] hover:border-[#3c3c3c] text-slate-300 hover:text-sky-400 rounded text-[9px] font-extrabold transition active:scale-95"
            title="Butun loyihani ZIP shaklida yuklab olish"
          >
            <Download className="w-3 h-3 text-sky-400 shrink-0" />
            <span>ZIP YUKLASH</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default YonPanel;
