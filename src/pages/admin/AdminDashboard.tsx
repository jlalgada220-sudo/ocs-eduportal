import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bell, Users, Calendar, Plus, Trash2, Edit, LogOut, 
  GraduationCap, Home, Save, X, ChevronLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  getSchoolData, saveSchoolData, generateId, 
  Notice, Teacher, Event, SchoolData 
} from '@/lib/schoolData';
import NoticeCard from '@/components/cards/NoticeCard';
import TeacherCard from '@/components/cards/TeacherCard';
import EventCard from '@/components/cards/EventCard';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

type Tab = 'notices' | 'teachers' | 'events';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('notices');
  const [data, setData] = useState<SchoolData>({ notices: [], teachers: [], events: [] });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Form states
  const [noticeForm, setNoticeForm] = useState<Partial<Notice>>({});
  const [teacherForm, setTeacherForm] = useState<Partial<Teacher>>({});
  const [eventForm, setEventForm] = useState<Partial<Event>>({});

  useEffect(() => {
    // Check auth
    const isLoggedIn = localStorage.getItem('admin_logged_in');
    if (!isLoggedIn) {
      navigate('/admin');
      return;
    }
    
    // Load data
    setData(getSchoolData());
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('admin_logged_in');
    navigate('/admin');
  };

  const resetForms = () => {
    setNoticeForm({});
    setTeacherForm({});
    setEventForm({});
    setEditingId(null);
    setIsFormOpen(false);
  };

  const handleSaveNotice = () => {
    if (!noticeForm.title || !noticeForm.content) {
      toast({ title: "Error", description: "Please fill required fields", variant: "destructive" });
      return;
    }

    const newData = { ...data };
    const notice: Notice = {
      id: editingId || generateId(),
      title: noticeForm.title,
      content: noticeForm.content,
      date: noticeForm.date || new Date().toISOString().split('T')[0],
      category: noticeForm.category || 'general',
      isImportant: noticeForm.isImportant || false
    };

    if (editingId) {
      const index = newData.notices.findIndex(n => n.id === editingId);
      if (index !== -1) newData.notices[index] = notice;
    } else {
      newData.notices.unshift(notice);
    }

    setData(newData);
    saveSchoolData(newData);
    resetForms();
    toast({ title: "Success", description: `Notice ${editingId ? 'updated' : 'added'} successfully` });
  };

  const handleSaveTeacher = () => {
    if (!teacherForm.name || !teacherForm.designation) {
      toast({ title: "Error", description: "Please fill required fields", variant: "destructive" });
      return;
    }

    const newData = { ...data };
    const teacher: Teacher = {
      id: editingId || generateId(),
      name: teacherForm.name,
      designation: teacherForm.designation,
      qualification: teacherForm.qualification || '',
      subject: teacherForm.subject || '',
      experience: teacherForm.experience || ''
    };

    if (editingId) {
      const index = newData.teachers.findIndex(t => t.id === editingId);
      if (index !== -1) newData.teachers[index] = teacher;
    } else {
      newData.teachers.push(teacher);
    }

    setData(newData);
    saveSchoolData(newData);
    resetForms();
    toast({ title: "Success", description: `Teacher ${editingId ? 'updated' : 'added'} successfully` });
  };

  const handleSaveEvent = () => {
    if (!eventForm.title || !eventForm.date) {
      toast({ title: "Error", description: "Please fill required fields", variant: "destructive" });
      return;
    }

    const newData = { ...data };
    const event: Event = {
      id: editingId || generateId(),
      title: eventForm.title,
      description: eventForm.description || '',
      date: eventForm.date,
      time: eventForm.time || '',
      venue: eventForm.venue || ''
    };

    if (editingId) {
      const index = newData.events.findIndex(e => e.id === editingId);
      if (index !== -1) newData.events[index] = event;
    } else {
      newData.events.unshift(event);
    }

    setData(newData);
    saveSchoolData(newData);
    resetForms();
    toast({ title: "Success", description: `Event ${editingId ? 'updated' : 'added'} successfully` });
  };

  const handleDelete = (type: Tab, id: string) => {
    const newData = { ...data };
    if (type === 'notices') {
      newData.notices = newData.notices.filter(n => n.id !== id);
    } else if (type === 'teachers') {
      newData.teachers = newData.teachers.filter(t => t.id !== id);
    } else {
      newData.events = newData.events.filter(e => e.id !== id);
    }
    setData(newData);
    saveSchoolData(newData);
    toast({ title: "Deleted", description: "Item removed successfully" });
  };

  const handleEdit = (type: Tab, item: Notice | Teacher | Event) => {
    setEditingId(item.id);
    setIsFormOpen(true);
    if (type === 'notices') setNoticeForm(item as Notice);
    else if (type === 'teachers') setTeacherForm(item as Teacher);
    else setEventForm(item as Event);
  };

  const tabs = [
    { id: 'notices' as Tab, label: 'Notices', icon: Bell, count: data.notices.length },
    { id: 'teachers' as Tab, label: 'Teachers', icon: Users, count: data.teachers.length },
    { id: 'events' as Tab, label: 'Events', icon: Calendar, count: data.events.length },
  ];

  return (
    <div className="min-h-screen bg-muted flex">
      {/* Sidebar */}
      <aside className={cn(
        "bg-primary text-primary-foreground transition-all duration-300 flex flex-col",
        sidebarOpen ? "w-64" : "w-16"
      )}>
        {/* Header */}
        <div className="p-4 border-b border-primary-foreground/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
              <GraduationCap className="w-6 h-6 text-accent-foreground" />
            </div>
            {sidebarOpen && (
              <div className="overflow-hidden">
                <h1 className="font-heading font-bold text-sm truncate">O.C.S Admin</h1>
                <p className="text-primary-foreground/60 text-xs">Dashboard</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); resetForms(); }}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all",
                activeTab === tab.id 
                  ? "bg-secondary text-secondary-foreground" 
                  : "hover:bg-primary-foreground/10"
              )}
            >
              <tab.icon className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && (
                <>
                  <span className="flex-1 text-left font-medium">{tab.label}</span>
                  <span className="bg-primary-foreground/20 text-xs px-2 py-0.5 rounded-full">
                    {tab.count}
                  </span>
                </>
              )}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-primary-foreground/10 space-y-2">
          <a
            href="/"
            className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-primary-foreground/10 transition-all"
          >
            <Home className="w-5 h-5" />
            {sidebarOpen && <span className="font-medium">View Website</span>}
          </a>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-destructive/20 text-destructive-foreground transition-all"
          >
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>

        {/* Toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-4 border-t border-primary-foreground/10 hover:bg-primary-foreground/10 transition-all"
        >
          <ChevronLeft className={cn(
            "w-5 h-5 mx-auto transition-transform",
            !sidebarOpen && "rotate-180"
          )} />
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground capitalize">
              {activeTab}
            </h1>
            <p className="text-muted-foreground">
              Manage your {activeTab} from here
            </p>
          </div>
          <Button 
            onClick={() => { resetForms(); setIsFormOpen(true); }}
            className="btn-gradient"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New
          </Button>
        </div>

        {/* Form Modal */}
        {isFormOpen && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-card rounded-2xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-auto">
              <div className="p-6 border-b border-border flex items-center justify-between">
                <h2 className="font-heading text-xl font-semibold">
                  {editingId ? 'Edit' : 'Add New'} {activeTab.slice(0, -1)}
                </h2>
                <button onClick={resetForms} className="text-muted-foreground hover:text-foreground">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                {/* Notice Form */}
                {activeTab === 'notices' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-2">Title *</label>
                      <Input
                        value={noticeForm.title || ''}
                        onChange={(e) => setNoticeForm({ ...noticeForm, title: e.target.value })}
                        placeholder="Notice title"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Content *</label>
                      <Textarea
                        value={noticeForm.content || ''}
                        onChange={(e) => setNoticeForm({ ...noticeForm, content: e.target.value })}
                        placeholder="Notice content"
                        rows={4}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Date</label>
                        <Input
                          type="date"
                          value={noticeForm.date || ''}
                          onChange={(e) => setNoticeForm({ ...noticeForm, date: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Category</label>
                        <select
                          value={noticeForm.category || 'general'}
                          onChange={(e) => setNoticeForm({ ...noticeForm, category: e.target.value as Notice['category'] })}
                          className="w-full h-10 px-3 rounded-md border border-input bg-background"
                        >
                          <option value="announcement">Announcement</option>
                          <option value="event">Event</option>
                          <option value="academic">Academic</option>
                          <option value="general">General</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="important"
                        checked={noticeForm.isImportant || false}
                        onChange={(e) => setNoticeForm({ ...noticeForm, isImportant: e.target.checked })}
                        className="rounded border-input"
                      />
                      <label htmlFor="important" className="text-sm">Mark as Important</label>
                    </div>
                    
                    {/* Preview */}
                    {noticeForm.title && (
                      <div className="border-t pt-4 mt-4">
                        <h3 className="text-sm font-medium mb-3">Preview</h3>
                        <NoticeCard 
                          notice={{
                            id: 'preview',
                            title: noticeForm.title || '',
                            content: noticeForm.content || '',
                            date: noticeForm.date || new Date().toISOString().split('T')[0],
                            category: noticeForm.category || 'general',
                            isImportant: noticeForm.isImportant || false
                          }} 
                        />
                      </div>
                    )}
                  </>
                )}

                {/* Teacher Form */}
                {activeTab === 'teachers' && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Name *</label>
                        <Input
                          value={teacherForm.name || ''}
                          onChange={(e) => setTeacherForm({ ...teacherForm, name: e.target.value })}
                          placeholder="Teacher name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Designation *</label>
                        <Input
                          value={teacherForm.designation || ''}
                          onChange={(e) => setTeacherForm({ ...teacherForm, designation: e.target.value })}
                          placeholder="e.g., Senior Teacher"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Qualification</label>
                        <Input
                          value={teacherForm.qualification || ''}
                          onChange={(e) => setTeacherForm({ ...teacherForm, qualification: e.target.value })}
                          placeholder="e.g., M.A., B.Ed"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Subject</label>
                        <Input
                          value={teacherForm.subject || ''}
                          onChange={(e) => setTeacherForm({ ...teacherForm, subject: e.target.value })}
                          placeholder="e.g., Mathematics"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Experience</label>
                      <Input
                        value={teacherForm.experience || ''}
                        onChange={(e) => setTeacherForm({ ...teacherForm, experience: e.target.value })}
                        placeholder="e.g., 10 years"
                      />
                    </div>
                    
                    {/* Preview */}
                    {teacherForm.name && (
                      <div className="border-t pt-4 mt-4">
                        <h3 className="text-sm font-medium mb-3">Preview</h3>
                        <div className="max-w-xs">
                          <TeacherCard 
                            teacher={{
                              id: 'preview',
                              name: teacherForm.name || '',
                              designation: teacherForm.designation || '',
                              qualification: teacherForm.qualification || '',
                              subject: teacherForm.subject || '',
                              experience: teacherForm.experience || ''
                            }} 
                          />
                        </div>
                      </div>
                    )}
                  </>
                )}

                {/* Event Form */}
                {activeTab === 'events' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-2">Title *</label>
                      <Input
                        value={eventForm.title || ''}
                        onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                        placeholder="Event title"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Description</label>
                      <Textarea
                        value={eventForm.description || ''}
                        onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                        placeholder="Event description"
                        rows={3}
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Date *</label>
                        <Input
                          type="date"
                          value={eventForm.date || ''}
                          onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Time</label>
                        <Input
                          type="text"
                          value={eventForm.time || ''}
                          onChange={(e) => setEventForm({ ...eventForm, time: e.target.value })}
                          placeholder="e.g., 10:00 AM"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Venue</label>
                        <Input
                          value={eventForm.venue || ''}
                          onChange={(e) => setEventForm({ ...eventForm, venue: e.target.value })}
                          placeholder="e.g., School Hall"
                        />
                      </div>
                    </div>
                    
                    {/* Preview */}
                    {eventForm.title && (
                      <div className="border-t pt-4 mt-4">
                        <h3 className="text-sm font-medium mb-3">Preview</h3>
                        <div className="max-w-xs">
                          <EventCard 
                            event={{
                              id: 'preview',
                              title: eventForm.title || '',
                              description: eventForm.description || '',
                              date: eventForm.date || new Date().toISOString().split('T')[0],
                              time: eventForm.time || '',
                              venue: eventForm.venue || ''
                            }} 
                          />
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>

              <div className="p-6 border-t border-border flex gap-4">
                <Button onClick={resetForms} variant="outline" className="flex-1">
                  Cancel
                </Button>
                <Button 
                  onClick={
                    activeTab === 'notices' ? handleSaveNotice :
                    activeTab === 'teachers' ? handleSaveTeacher :
                    handleSaveEvent
                  }
                  className="flex-1 btn-gradient"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {editingId ? 'Update' : 'Save'}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeTab === 'notices' && data.notices.map((notice) => (
            <div key={notice.id} className="relative group">
              <NoticeCard notice={notice} />
              <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleEdit('notices', notice)}
                  className="p-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete('notices', notice.id)}
                  className="p-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/80"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {activeTab === 'teachers' && data.teachers.map((teacher) => (
            <div key={teacher.id} className="relative group">
              <TeacherCard teacher={teacher} />
              <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleEdit('teachers', teacher)}
                  className="p-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete('teachers', teacher.id)}
                  className="p-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/80"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {activeTab === 'events' && data.events.map((event) => (
            <div key={event.id} className="relative group">
              <EventCard event={event} />
              <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleEdit('events', event)}
                  className="p-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete('events', event.id)}
                  className="p-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/80"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {((activeTab === 'notices' && data.notices.length === 0) ||
          (activeTab === 'teachers' && data.teachers.length === 0) ||
          (activeTab === 'events' && data.events.length === 0)) && (
          <div className="text-center py-16">
            {activeTab === 'notices' && <Bell className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />}
            {activeTab === 'teachers' && <Users className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />}
            {activeTab === 'events' && <Calendar className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />}
            <p className="text-muted-foreground text-lg">No {activeTab} yet</p>
            <p className="text-muted-foreground text-sm mt-1">Click "Add New" to create your first entry</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
